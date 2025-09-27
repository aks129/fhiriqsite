# FHIR IQ Chatbot - Secrets Management Setup

This document provides step-by-step instructions for configuring API keys and secrets required for the FHIR IQ chatbot functionality.

## Overview

The chatbot requires several API keys and secrets to function properly:

1. **OpenAI API Key** - For LLM responses and embeddings
2. **Vector Store Credentials** - For RAG document search (Pinecone, Weaviate, or Supabase)
3. **Admin Keys** - For analytics and monitoring endpoints
4. **Optional: Authentication Tokens** - For enhanced security

## Wix Secrets Manager Configuration

### Step 1: Access Wix Secrets Manager

1. Go to your Wix Dashboard
2. Navigate to **Settings** → **Secrets Manager**
3. Click **"Add Secret"** to create new secrets

### Step 2: Required Secrets

#### OpenAI API Key
```
Secret Name: OPENAI_API_KEY
Secret Value: sk-your-openai-api-key-here
Description: OpenAI API key for chat responses and embeddings
```

**How to get an OpenAI API Key:**
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Go to **API Keys** section
4. Click **"Create new secret key"**
5. Copy the key and store it securely

#### Vector Store Secrets (Choose One)

**Option A: Pinecone**
```
Secret Name: PINECONE_API_KEY
Secret Value: your-pinecone-api-key
Description: Pinecone API key for vector search

Secret Name: PINECONE_ENVIRONMENT
Secret Value: your-pinecone-environment (e.g., us-east1-gcp)
Description: Pinecone environment region

Secret Name: PINECONE_INDEX_NAME
Secret Value: fhir-knowledge-base
Description: Pinecone index name for FHIR documents
```

**Option B: Weaviate**
```
Secret Name: WEAVIATE_HOST
Secret Value: your-cluster.weaviate.network
Description: Weaviate cluster host URL

Secret Name: WEAVIATE_API_KEY
Secret Value: your-weaviate-api-key
Description: Weaviate API key for authentication

Secret Name: WEAVIATE_CLASS_NAME
Secret Value: FHIRDocuments
Description: Weaviate class name for FHIR knowledge
```

**Option C: Supabase Vector**
```
Secret Name: SUPABASE_URL
Secret Value: https://your-project.supabase.co
Description: Supabase project URL

Secret Name: SUPABASE_ANON_KEY
Secret Value: your-supabase-anon-key
Description: Supabase anonymous key

Secret Name: SUPABASE_SERVICE_ROLE_KEY
Secret Value: your-supabase-service-role-key
Description: Supabase service role key (for backend operations)
```

#### Admin and Security Keys
```
Secret Name: CHAT_ADMIN_KEY
Secret Value: your-secure-admin-key-here
Description: Admin key for accessing chat analytics

Secret Name: SYNC_TOKEN
Secret Value: your-sync-authentication-token
Description: Authentication token for external sync operations
```

### Step 3: Accessing Secrets in Code

The chatbot backend uses Wix's `getSecret()` function to retrieve secrets securely:

```javascript
import { getSecret } from 'wix-secrets-backend';

// Example usage in backend code
const openaiApiKey = await getSecret('OPENAI_API_KEY');
const pineconeApiKey = await getSecret('PINECONE_API_KEY');
```

## Vector Store Setup Guide

### Option 1: Pinecone Setup

1. **Create Account**: Visit [Pinecone](https://www.pinecone.io/) and sign up
2. **Create Index**:
   - Index name: `fhir-knowledge-base`
   - Dimensions: `1536` (for OpenAI text-embedding-ada-002)
   - Metric: `cosine`
   - Pod type: `p1.x1` (starter tier)
3. **Get Credentials**:
   - API Key: Found in your Pinecone console
   - Environment: Your cluster region (e.g., `us-east1-gcp`)

### Option 2: Weaviate Setup

1. **Create Account**: Visit [Weaviate Cloud](https://console.weaviate.cloud/)
2. **Create Cluster**:
   - Choose a plan (Sandbox for development)
   - Select region closest to your users
3. **Setup Schema**:
   ```javascript
   // Schema for FHIR documents
   {
     "class": "FHIRDocument",
     "properties": [
       {"name": "content", "dataType": ["text"]},
       {"name": "source", "dataType": ["string"]},
       {"name": "url", "dataType": ["string"]},
       {"name": "category", "dataType": ["string"]},
       {"name": "section", "dataType": ["string"]}
     ],
     "vectorizer": "text2vec-openai"
   }
   ```

### Option 3: Supabase Vector Setup

1. **Create Project**: Visit [Supabase](https://supabase.com/) and create new project
2. **Enable Vector Extension**:
   ```sql
   -- Run in Supabase SQL editor
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
3. **Create Table**:
   ```sql
   CREATE TABLE fhir_documents (
     id BIGSERIAL PRIMARY KEY,
     content TEXT NOT NULL,
     source TEXT,
     url TEXT,
     category TEXT,
     section TEXT,
     metadata JSONB,
     embedding VECTOR(1536),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create index for vector similarity search
   CREATE INDEX ON fhir_documents USING ivfflat (embedding vector_cosine_ops);
   ```

## Security Best Practices

### Secret Rotation
- Rotate API keys every 90 days
- Use different keys for development and production
- Monitor API key usage in provider dashboards

### Access Control
- Limit Wix team member access to secrets
- Use service accounts for production API keys
- Enable API key restrictions where possible

### Monitoring
- Set up billing alerts for AI service usage
- Monitor API rate limits and quotas
- Log failed authentication attempts

## Environment-Specific Configuration

### Development Environment
```
OPENAI_API_KEY: Development key with lower rate limits
PINECONE_INDEX_NAME: fhir-knowledge-dev
CHAT_ADMIN_KEY: dev-admin-key
```

### Production Environment
```
OPENAI_API_KEY: Production key with higher rate limits
PINECONE_INDEX_NAME: fhir-knowledge-prod
CHAT_ADMIN_KEY: secure-production-admin-key
```

## Troubleshooting

### Common Issues

1. **"Secret not found" errors**
   - Verify secret name matches exactly (case-sensitive)
   - Check if secret is published to the correct environment
   - Ensure backend code is using correct import

2. **OpenAI API errors**
   - Verify API key is valid and active
   - Check billing and rate limits in OpenAI dashboard
   - Ensure model access permissions

3. **Vector store connection failures**
   - Verify all required credentials are set
   - Check network connectivity and firewall rules
   - Validate index/database exists and is accessible

### Debug Mode

Enable debug logging to troubleshoot secret access:

```javascript
// Add to backend chat module for debugging
try {
  const secret = await getSecret('OPENAI_API_KEY');
  console.log('Secret retrieved successfully:', !!secret);
} catch (error) {
  console.error('Secret access error:', error);
}
```

## Cost Management

### OpenAI Usage Optimization
- Set monthly spending limits in OpenAI dashboard
- Monitor token usage in chat analytics
- Use lower temperature for factual responses
- Implement response caching where appropriate

### Vector Store Costs
- **Pinecone**: Monitor index size and query volume
- **Weaviate**: Track cluster usage and upgrade as needed
- **Supabase**: Monitor database size and API calls

### Rate Limiting
Implement client-side rate limiting to prevent abuse:

```javascript
// Example rate limiting in HTTP function
const rateLimitKey = `chat_${request.ip}`;
const requestCount = await checkRateLimit(rateLimitKey);

if (requestCount > 60) { // 60 requests per hour
  return tooManyRequests({
    body: JSON.stringify({
      error: 'Rate limit exceeded',
      message: 'Please wait before sending another message'
    })
  });
}
```

## Backup and Recovery

### Secret Backup
- Maintain secure backup of all API keys
- Document recovery procedures for each service
- Test backup keys periodically

### Service Continuity
- Have fallback providers configured
- Implement graceful degradation for service outages
- Set up monitoring and alerting for service health

## Compliance Considerations

### HIPAA Compliance
- Ensure all AI services used are HIPAA-compliant
- Sign Business Associate Agreements (BAAs) where required
- Implement data handling procedures for PHI

### Data Privacy
- Configure data retention policies
- Implement data deletion procedures
- Ensure compliance with GDPR and other regulations

## Support and Escalation

### Vendor Support
- **OpenAI**: [OpenAI Help Center](https://help.openai.com/)
- **Pinecone**: [Pinecone Support](https://www.pinecone.io/support/)
- **Weaviate**: [Weaviate Support](https://weaviate.io/developers/weaviate/more-resources/support)
- **Supabase**: [Supabase Support](https://supabase.com/support)

### Internal Escalation
1. Check configuration and logs
2. Verify service status pages
3. Contact vendor support if needed
4. Escalate to FHIR IQ technical lead

## Checklist for Go-Live

- [ ] All required secrets configured in Wix Secrets Manager
- [ ] Vector store provisioned and indexed with FHIR content
- [ ] OpenAI account configured with billing and rate limits
- [ ] Admin access and monitoring configured
- [ ] Rate limiting and security measures implemented
- [ ] Backup and recovery procedures documented
- [ ] Team trained on secret management procedures