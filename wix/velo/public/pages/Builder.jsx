import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
  LinearProgress,
  Link
} from '@mui/material';
import {
  CloudDownload,
  Build,
  CheckCircle,
  Error,
  Info,
  PlayArrow,
  Code,
  Description,
  Storage,
  Security,
  Speed
} from '@mui/icons-material';

// FHIR IQ theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      dark: '#115293',
      light: '#4791db'
    },
    secondary: {
      main: '#dc004e',
      dark: '#9a0036',
      light: '#e5336e'
    },
    background: {
      default: '#f5f5f5'
    }
  },
  typography: {
    h4: {
      fontWeight: 600,
      color: '#1976d2'
    },
    h6: {
      fontWeight: 500
    }
  }
});

const BUILDER_SERVICE_URL = process.env.REACT_APP_BUILDER_SERVICE_URL || 'https://builder-api.fhiriq.com';

const steps = [
  'Configure FHIR Server',
  'Select Resources',
  'Choose Stack',
  'Generate Application'
];

const COMMON_FHIR_RESOURCES = [
  { name: 'Patient', description: 'Patient demographics and basic information', popular: true },
  { name: 'Observation', description: 'Clinical observations and measurements', popular: true },
  { name: 'Condition', description: 'Patient conditions and diagnoses', popular: true },
  { name: 'MedicationRequest', description: 'Medication prescriptions and orders', popular: true },
  { name: 'Encounter', description: 'Healthcare encounters and visits', popular: true },
  { name: 'Practitioner', description: 'Healthcare practitioners and providers', popular: false },
  { name: 'Organization', description: 'Healthcare organizations', popular: false },
  { name: 'Location', description: 'Physical locations', popular: false },
  { name: 'Appointment', description: 'Scheduled appointments', popular: true },
  { name: 'DiagnosticReport', description: 'Diagnostic test results', popular: true },
  { name: 'Procedure', description: 'Medical procedures performed', popular: false },
  { name: 'CarePlan', description: 'Care plans and treatment plans', popular: false },
  { name: 'Goal', description: 'Patient care goals', popular: false },
  { name: 'AllergyIntolerance', description: 'Patient allergies and intolerances', popular: false },
  { name: 'Immunization', description: 'Vaccination records', popular: false }
];

const TECH_STACKS = [
  {
    id: 'node_hapi',
    name: 'Node.js + HAPI FHIR',
    description: 'Full-stack JavaScript solution with HAPI FHIR server',
    features: ['Node.js Backend', 'React Frontend', 'Docker Support', 'PostgreSQL Database'],
    recommended: true
  },
  {
    id: 'next_fhir',
    name: 'Next.js + FHIR Client',
    description: 'Modern React framework with FHIR client integration',
    features: ['Next.js Framework', 'TypeScript Support', 'API Routes', 'Vercel Deployment'],
    recommended: false
  },
  {
    id: 'python_flask',
    name: 'Python + Flask',
    description: 'Python backend with Flask and FHIR client',
    features: ['Flask Backend', 'Python FHIR Client', 'SQLAlchemy ORM', 'Docker Support'],
    recommended: false
  }
];

export default function Builder() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    capabilityStatementUrl: '',
    stack: 'node_hapi',
    resources: ['Patient', 'Observation'],
    appName: '',
    description: ''
  });
  const [capabilityAnalysis, setCapabilityAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [buildResult, setBuildResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  // Sample FHIR servers for demo
  const sampleServers = [
    {
      name: 'HAPI FHIR Test Server',
      url: 'https://hapi.fhir.org/baseR4/metadata'
    },
    {
      name: 'Synthea Sample Data',
      url: 'https://r4.smarthealthit.org/metadata'
    }
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const analyzeCapabilityStatement = async (url) => {
    setAnalyzing(true);
    setError(null);

    try {
      const response = await fetch(`${BUILDER_SERVICE_URL}/api/builder/capability-statement?url=${encodeURIComponent(url)}`);

      if (!response.ok) {
        throw new Error('Failed to analyze capability statement');
      }

      const data = await response.json();
      setCapabilityAnalysis(data.analysis);

      // Auto-select recommended resources
      const recommendedResources = data.analysis.recommendedResources || [];
      setFormData(prev => ({
        ...prev,
        resources: recommendedResources.slice(0, 5) // Limit to 5 for demo
      }));

    } catch (err) {
      setError(`Failed to analyze FHIR server: ${err.message}`);
    } finally {
      setAnalyzing(false);
    }
  };

  const generateApplication = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        capabilityStatementUrl: formData.capabilityStatementUrl,
        stack: formData.stack,
        resources: formData.resources,
        appName: formData.appName || 'My FHIR Application',
        description: formData.description || 'A FHIR application generated by FHIR IQ Builder'
      };

      const response = await fetch(`${BUILDER_SERVICE_URL}/api/builder/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate application');
      }

      const result = await response.json();
      setBuildResult(result);
      handleNext();

    } catch (err) {
      setError(`Generation failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResourceToggle = (resourceName) => {
    setFormData(prev => ({
      ...prev,
      resources: prev.resources.includes(resourceName)
        ? prev.resources.filter(r => r !== resourceName)
        : [...prev.resources, resourceName]
    }));
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Configure Your FHIR Server
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Enter the URL to your FHIR server's capability statement. We'll analyze it to understand what resources are available.
            </Typography>

            <TextField
              fullWidth
              label="FHIR Capability Statement URL"
              value={formData.capabilityStatementUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, capabilityStatementUrl: e.target.value }))}
              placeholder="https://your-fhir-server.com/fhir/metadata"
              margin="normal"
              helperText="The URL should point to your FHIR server's metadata endpoint"
            />

            <Button
              variant="outlined"
              onClick={() => analyzeCapabilityStatement(formData.capabilityStatementUrl)}
              disabled={!formData.capabilityStatementUrl || analyzing}
              startIcon={analyzing ? <CircularProgress size={20} /> : <PlayArrow />}
              sx={{ mt: 2, mb: 2 }}
            >
              {analyzing ? 'Analyzing...' : 'Analyze Server'}
            </Button>

            {capabilityAnalysis && (
              <Alert severity="success" sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Server Analysis Complete!</Typography>
                <Typography variant="body2">
                  Found {capabilityAnalysis.supportedResources?.length || 0} supported resources.
                  FHIR Version: {capabilityAnalysis.version}
                </Typography>
              </Alert>
            )}

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
              Try Sample Servers:
            </Typography>
            <Grid container spacing={1}>
              {sampleServers.map((server, index) => (
                <Grid item key={index}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, capabilityStatementUrl: server.url }));
                      analyzeCapabilityStatement(server.url);
                    }}
                  >
                    {server.name}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select FHIR Resources
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Choose the FHIR resources your application will work with. We'll generate appropriate components and API endpoints for each.
            </Typography>

            {capabilityAnalysis && (
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  Your server supports {capabilityAnalysis.supportedResources?.length || 0} resources.
                  We've pre-selected some commonly used ones.
                </Typography>
              </Alert>
            )}

            <FormGroup>
              <Grid container spacing={1}>
                {COMMON_FHIR_RESOURCES.map((resource) => {
                  const isSupported = !capabilityAnalysis ||
                    capabilityAnalysis.supportedResources?.includes(resource.name);
                  const isSelected = formData.resources.includes(resource.name);

                  return (
                    <Grid item xs={12} sm={6} md={4} key={resource.name}>
                      <Card
                        variant={isSelected ? "elevation" : "outlined"}
                        sx={{
                          opacity: isSupported ? 1 : 0.5,
                          borderColor: isSelected ? 'primary.main' : undefined,
                          cursor: isSupported ? 'pointer' : 'not-allowed'
                        }}
                        onClick={() => isSupported && handleResourceToggle(resource.name)}
                      >
                        <CardContent sx={{ pb: 1 }}>
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="subtitle1" component="div">
                              {resource.name}
                              {resource.popular && (
                                <Chip size="small" label="Popular" color="primary" sx={{ ml: 1 }} />
                              )}
                            </Typography>
                            <Checkbox
                              checked={isSelected}
                              disabled={!isSupported}
                              onChange={() => isSupported && handleResourceToggle(resource.name)}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {resource.description}
                          </Typography>
                          {!isSupported && (
                            <Typography variant="caption" color="error">
                              Not supported by your server
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </FormGroup>

            <Typography variant="body2" sx={{ mt: 2 }}>
              Selected: {formData.resources.length} resources
            </Typography>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Choose Technology Stack
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Select the technology stack for your FHIR application. Each option includes a complete working application with documentation.
            </Typography>

            <Grid container spacing={2}>
              {TECH_STACKS.map((stack) => (
                <Grid item xs={12} md={4} key={stack.id}>
                  <Card
                    variant={formData.stack === stack.id ? "elevation" : "outlined"}
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      borderColor: formData.stack === stack.id ? 'primary.main' : undefined
                    }}
                    onClick={() => setFormData(prev => ({ ...prev, stack: stack.id }))}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" component="div">
                          {stack.name}
                          {stack.recommended && (
                            <Chip size="small" label="Recommended" color="primary" sx={{ ml: 1 }} />
                          )}
                        </Typography>
                        {formData.stack === stack.id && <CheckCircle color="primary" />}
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {stack.description}
                      </Typography>
                      <List dense>
                        {stack.features.map((feature, index) => (
                          <ListItem key={index} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 20 }}>
                              <CheckCircle fontSize="small" color="success" />
                            </ListItemIcon>
                            <ListItemText primary={feature} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Application Name (Optional)"
                value={formData.appName}
                onChange={(e) => setFormData(prev => ({ ...prev, appName: e.target.value }))}
                placeholder="My FHIR Application"
                margin="normal"
              />

              <TextField
                fullWidth
                label="Description (Optional)"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="A brief description of your application"
                multiline
                rows={2}
                margin="normal"
              />
            </Box>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Application Generated Successfully! 🎉
            </Typography>

            {buildResult && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Build Information
                      </Typography>
                      <Typography variant="body2">
                        <strong>Build ID:</strong> {buildResult.buildId}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Stack:</strong> {buildResult.metadata?.stack}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Resources:</strong> {buildResult.metadata?.resources?.join(', ')}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Generated:</strong> {new Date(buildResult.metadata?.generatedAt).toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        What's Included
                      </Typography>
                      <List dense>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon><Code fontSize="small" /></ListItemIcon>
                          <ListItemText primary="Complete source code" />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon><Description fontSize="small" /></ListItemIcon>
                          <ListItemText primary="Documentation & setup guide" />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon><Storage fontSize="small" /></ListItemIcon>
                          <ListItemText primary="Docker configuration" />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon><Security fontSize="small" /></ListItemIcon>
                          <ListItemText primary="Security best practices" />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    startIcon={<CloudDownload />}
                    href={`${BUILDER_SERVICE_URL}${buildResult.downloadUrl}`}
                    target="_blank"
                    size="large"
                  >
                    Download ZIP
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      // Reset to start over
                      setActiveStep(0);
                      setBuildResult(null);
                      setCapabilityAnalysis(null);
                      setFormData({
                        capabilityStatementUrl: '',
                        stack: 'node_hapi',
                        resources: ['Patient', 'Observation'],
                        appName: '',
                        description: ''
                      });
                    }}
                  >
                    Build Another App
                  </Button>
                </CardActions>
              </Card>
            )}

            <Alert severity="info">
              <Typography variant="subtitle2">Next Steps:</Typography>
              <Typography variant="body2">
                1. Download and extract the ZIP file<br />
                2. Follow the README instructions to set up your environment<br />
                3. Configure your FHIR server connection<br />
                4. Run the application with `npm run dev`
              </Typography>
            </Alert>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Need help getting started? Check out our{' '}
                <Link href="/docs/getting-started" target="_blank">
                  Getting Started Guide
                </Link>{' '}
                or{' '}
                <Link href="/contact" target="_blank">
                  contact our support team
                </Link>.
              </Typography>
            </Box>
          </Box>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={1} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            FHIR Application Builder
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" paragraph>
            Generate a complete FHIR application in minutes. Just specify your FHIR server,
            choose your resources, and we'll create a fully functional application with documentation.
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {loading && (
            <Box sx={{ mb: 3 }}>
              <LinearProgress />
              <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                Generating your FHIR application... This may take a few moments.
              </Typography>
            </Box>
          )}

          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={() => {
                  setActiveStep(0);
                  setBuildResult(null);
                  setCapabilityAnalysis(null);
                }}
              >
                Build Another App
              </Button>
            ) : activeStep === steps.length - 2 ? (
              <Button
                variant="contained"
                onClick={generateApplication}
                disabled={loading || !formData.capabilityStatementUrl || formData.resources.length === 0}
                startIcon={loading ? <CircularProgress size={20} /> : <Build />}
              >
                {loading ? 'Generating...' : 'Generate Application'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={
                  (activeStep === 0 && !capabilityAnalysis) ||
                  (activeStep === 1 && formData.resources.length === 0)
                }
              >
                Next
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}