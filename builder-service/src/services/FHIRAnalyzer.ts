import { logger } from '../utils/logger.js';
import type { CapabilityAnalysis } from './BuilderService.js';

export interface FHIRCapabilityStatement {
  resourceType: string;
  fhirVersion?: string;
  implementation?: {
    description?: string;
    url?: string;
  };
  rest?: Array<{
    mode?: string;
    resource?: Array<{
      type?: string;
      interaction?: Array<{
        code?: string;
      }>;
      searchParam?: Array<{
        name?: string;
        type?: string;
        documentation?: string;
      }>;
    }>;
  }>;
}

export class FHIRAnalyzer {
  /**
   * Analyzes a FHIR Capability Statement and extracts useful information
   */
  analyzeCapabilityStatement(capabilityStatement: FHIRCapabilityStatement): CapabilityAnalysis {
    logger.info('Analyzing FHIR Capability Statement', {
      resourceType: capabilityStatement.resourceType,
      fhirVersion: capabilityStatement.fhirVersion
    });

    if (capabilityStatement.resourceType !== 'CapabilityStatement') {
      throw new Error('Invalid resource type. Expected CapabilityStatement.');
    }

    const serverUrl = this.extractServerUrl(capabilityStatement);
    const version = capabilityStatement.fhirVersion || 'Unknown';

    // Extract REST capabilities
    const restCapabilities = this.extractRestCapabilities(capabilityStatement);

    const analysis: CapabilityAnalysis = {
      serverUrl,
      version,
      supportedResources: restCapabilities.supportedResources,
      interactions: restCapabilities.interactions,
      searchParameters: restCapabilities.searchParameters,
      recommendedResources: this.getRecommendedResources(restCapabilities.supportedResources)
    };

    logger.info('Capability Statement analysis completed', {
      supportedResourcesCount: analysis.supportedResources.length,
      recommendedResourcesCount: analysis.recommendedResources.length
    });

    return analysis;
  }

  private extractServerUrl(capabilityStatement: FHIRCapabilityStatement): string {
    // Try to extract server URL from implementation
    const implementationUrl = capabilityStatement.implementation?.url;

    if (implementationUrl) {
      // Remove /metadata suffix if present
      return implementationUrl.replace(/\/metadata\/?$/, '');
    }

    // Fallback to a generic placeholder
    return 'https://your-fhir-server.com/fhir';
  }

  private extractRestCapabilities(capabilityStatement: FHIRCapabilityStatement) {
    const supportedResources: string[] = [];
    const interactions: Record<string, string[]> = {};
    const searchParameters: Record<string, string[]> = {};

    // Find the server REST endpoint
    const serverRest = capabilityStatement.rest?.find(rest => rest.mode === 'server');

    if (!serverRest?.resource) {
      logger.warn('No server REST capabilities found in Capability Statement');
      return { supportedResources, interactions, searchParameters };
    }

    for (const resource of serverRest.resource) {
      if (!resource.type) continue;

      const resourceType = resource.type;
      supportedResources.push(resourceType);

      // Extract interactions
      if (resource.interaction) {
        interactions[resourceType] = resource.interaction
          .map(interaction => interaction.code)
          .filter(Boolean) as string[];
      }

      // Extract search parameters
      if (resource.searchParam) {
        searchParameters[resourceType] = resource.searchParam
          .map(param => param.name)
          .filter(Boolean) as string[];
      }
    }

    return { supportedResources, interactions, searchParameters };
  }

  private getRecommendedResources(supportedResources: string[]): string[] {
    // Define common FHIR resources that are useful for most applications
    const commonResources = [
      'Patient',
      'Observation',
      'Condition',
      'MedicationRequest',
      'Encounter',
      'Practitioner',
      'Organization',
      'Location',
      'Appointment',
      'DiagnosticReport'
    ];

    // Return intersection of common resources and supported resources
    const recommended = commonResources.filter(resource =>
      supportedResources.includes(resource)
    );

    // If no common resources are supported, return the first 5 supported resources
    if (recommended.length === 0) {
      return supportedResources.slice(0, 5);
    }

    return recommended.slice(0, 8); // Limit to 8 recommendations
  }

  /**
   * Validates that the requested resources are supported by the FHIR server
   */
  validateResourceSupport(requestedResources: string[], supportedResources: string[]): {
    valid: boolean;
    unsupportedResources: string[];
    suggestions: string[];
  } {
    const unsupportedResources = requestedResources.filter(
      resource => !supportedResources.includes(resource)
    );

    const suggestions = this.suggestAlternativeResources(unsupportedResources, supportedResources);

    return {
      valid: unsupportedResources.length === 0,
      unsupportedResources,
      suggestions
    };
  }

  private suggestAlternativeResources(unsupportedResources: string[], supportedResources: string[]): string[] {
    const suggestions: string[] = [];

    // Define resource mappings for common alternatives
    const resourceMappings: Record<string, string[]> = {
      'MedicationRequest': ['MedicationOrder', 'MedicationStatement'],
      'MedicationOrder': ['MedicationRequest', 'MedicationStatement'],
      'DiagnosticOrder': ['ServiceRequest', 'DiagnosticReport'],
      'ServiceRequest': ['DiagnosticOrder', 'ProcedureRequest'],
      'ProcedureRequest': ['ServiceRequest', 'Procedure'],
      'DocumentReference': ['Binary', 'Media'],
      'ImagingStudy': ['DiagnosticReport', 'Media'],
      'CarePlan': ['Goal', 'Task'],
      'CareTeam': ['Practitioner', 'Organization']
    };

    for (const unsupported of unsupportedResources) {
      const alternatives = resourceMappings[unsupported] || [];
      const availableAlternatives = alternatives.filter(alt => supportedResources.includes(alt));
      suggestions.push(...availableAlternatives);
    }

    return [...new Set(suggestions)]; // Remove duplicates
  }

  /**
   * Estimates the complexity of implementing the requested resources
   */
  estimateImplementationComplexity(resources: string[]): {
    complexity: 'simple' | 'moderate' | 'complex';
    estimatedHours: number;
    factors: string[];
  } {
    const complexityFactors: string[] = [];
    let baseHours = 4; // Base implementation time

    // Resource complexity mapping
    const resourceComplexity: Record<string, number> = {
      'Patient': 1,
      'Observation': 2,
      'Condition': 2,
      'MedicationRequest': 3,
      'Encounter': 3,
      'DiagnosticReport': 4,
      'ImagingStudy': 5,
      'Procedure': 3,
      'CarePlan': 4,
      'CareTeam': 3,
      'Questionnaire': 5,
      'QuestionnaireResponse': 4,
      'Subscription': 6,
      'Consent': 5
    };

    let totalComplexity = 0;

    for (const resource of resources) {
      const complexity = resourceComplexity[resource] || 2;
      totalComplexity += complexity;

      if (complexity >= 4) {
        complexityFactors.push(`${resource} is a complex resource requiring additional development time`);
      }
    }

    // Calculate estimated hours
    const estimatedHours = baseHours + (totalComplexity * 0.5);

    // Determine overall complexity
    let complexity: 'simple' | 'moderate' | 'complex';
    if (totalComplexity <= 6) {
      complexity = 'simple';
    } else if (totalComplexity <= 15) {
      complexity = 'moderate';
    } else {
      complexity = 'complex';
      complexityFactors.push('Large number of resources increases integration complexity');
    }

    return {
      complexity,
      estimatedHours: Math.ceil(estimatedHours),
      factors: complexityFactors
    };
  }
}