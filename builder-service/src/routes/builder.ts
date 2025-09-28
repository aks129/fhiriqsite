import { Router } from 'express';
import { z } from 'zod';
import { BuilderService } from '../services/BuilderService.js';
import { logger } from '../utils/logger.js';

const router = Router();
const builderService = new BuilderService();

// Request validation schema
const BuildRequestSchema = z.object({
  capabilityStatementUrl: z.string().url('Must be a valid URL'),
  stack: z.enum(['node_hapi', 'next_fhir', 'python_flask']).default('node_hapi'),
  resources: z.array(z.string()).min(1, 'At least one FHIR resource must be specified'),
  appName: z.string().min(1, 'App name is required').optional(),
  description: z.string().optional(),
  features: z.array(z.string()).optional()
});

export type BuildRequest = z.infer<typeof BuildRequestSchema>;

/**
 * POST /api/builder/generate
 *
 * Generates a FHIR application scaffold based on the provided requirements
 */
router.post('/generate', async (req, res) => {
  try {
    // Validate request body
    const validationResult = BuildRequestSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation Error',
        details: validationResult.error.format(),
        timestamp: new Date().toISOString()
      });
    }

    const buildRequest = validationResult.data;

    logger.info('Received build request', {
      capabilityStatementUrl: buildRequest.capabilityStatementUrl,
      stack: buildRequest.stack,
      resourceCount: buildRequest.resources.length
    });

    // Generate scaffold
    const result = await builderService.generateScaffold(buildRequest);

    res.json({
      success: true,
      buildId: result.buildId,
      downloadUrl: result.downloadUrl,
      expiresAt: result.expiresAt,
      metadata: {
        stack: buildRequest.stack,
        resources: buildRequest.resources,
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    logger.error('Build generation failed', { error: error.message, stack: error.stack });

    res.status(500).json({
      error: 'Build Generation Failed',
      message: error.message || 'An unexpected error occurred',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/builder/download/:buildId
 *
 * Downloads the generated scaffold ZIP file
 */
router.get('/download/:buildId', async (req, res) => {
  try {
    const { buildId } = req.params;

    if (!buildId || buildId.length < 10) {
      return res.status(400).json({
        error: 'Invalid Build ID',
        message: 'Build ID is required and must be valid',
        timestamp: new Date().toISOString()
      });
    }

    const zipBuffer = await builderService.getScaffoldZip(buildId);

    if (!zipBuffer) {
      return res.status(404).json({
        error: 'Build Not Found',
        message: 'The requested build ID was not found or has expired',
        timestamp: new Date().toISOString()
      });
    }

    // Set headers for ZIP download
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="fhir-app-${buildId}.zip"`);
    res.setHeader('Content-Length', zipBuffer.length);

    res.send(zipBuffer);

  } catch (error) {
    logger.error('Download failed', { buildId: req.params.buildId, error: error.message });

    res.status(500).json({
      error: 'Download Failed',
      message: 'Unable to retrieve the scaffold. Please try generating again.',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/builder/capability-statement
 *
 * Proxy endpoint to fetch and analyze FHIR Capability Statements
 */
router.get('/capability-statement', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({
        error: 'Missing URL',
        message: 'Capability Statement URL is required',
        timestamp: new Date().toISOString()
      });
    }

    const analysis = await builderService.analyzeCapabilityStatement(url);

    res.json({
      success: true,
      url,
      analysis,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Capability statement analysis failed', { url: req.query.url, error: error.message });

    res.status(500).json({
      error: 'Analysis Failed',
      message: 'Unable to analyze the capability statement. Please check the URL and try again.',
      timestamp: new Date().toISOString()
    });
  }
});

export { router as builderRouter };