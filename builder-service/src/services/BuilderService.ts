import { promises as fs } from 'fs';
import path from 'path';
import archiver from 'archiver';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { TemplateService } from './TemplateService.js';
import { FHIRAnalyzer } from './FHIRAnalyzer.js';
import { logger } from '../utils/logger.js';
import type { BuildRequest } from '../routes/builder.js';

export interface BuildResult {
  buildId: string;
  downloadUrl: string;
  expiresAt: Date;
}

export interface CapabilityAnalysis {
  serverUrl: string;
  version: string;
  supportedResources: string[];
  interactions: Record<string, string[]>;
  searchParameters: Record<string, string[]>;
  recommendedResources: string[];
}

export class BuilderService {
  private templateService: TemplateService;
  private fhirAnalyzer: FHIRAnalyzer;
  private buildsDir: string;

  constructor() {
    this.templateService = new TemplateService();
    this.fhirAnalyzer = new FHIRAnalyzer();
    this.buildsDir = path.join(process.cwd(), 'builds');
    this.ensureBuildsDirectory();
  }

  private async ensureBuildsDirectory(): Promise<void> {
    try {
      await fs.access(this.buildsDir);
    } catch {
      await fs.mkdir(this.buildsDir, { recursive: true });
      logger.info('Created builds directory', { path: this.buildsDir });
    }
  }

  /**
   * Generates a complete FHIR application scaffold
   */
  async generateScaffold(request: BuildRequest): Promise<BuildResult> {
    const buildId = uuidv4();
    const buildDir = path.join(this.buildsDir, buildId);

    try {
      logger.info('Starting scaffold generation', { buildId, request });

      // Analyze the capability statement
      const capabilityAnalysis = await this.analyzeCapabilityStatement(request.capabilityStatementUrl);

      // Validate requested resources are supported
      this.validateResourceSupport(request.resources, capabilityAnalysis.supportedResources);

      // Generate the application structure
      await this.generateApplicationStructure(buildDir, request, capabilityAnalysis);

      // Create ZIP file
      const zipBuffer = await this.createZipArchive(buildDir, buildId);

      // Store the ZIP for download
      const zipPath = path.join(this.buildsDir, `${buildId}.zip`);
      await fs.writeFile(zipPath, zipBuffer);

      // Clean up the temporary directory
      await fs.rm(buildDir, { recursive: true, force: true });

      // Set expiration (24 hours from now)
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

      logger.info('Scaffold generation completed', { buildId, zipSize: zipBuffer.length });

      return {
        buildId,
        downloadUrl: `/api/builder/download/${buildId}`,
        expiresAt
      };

    } catch (error) {
      // Clean up on error
      try {
        await fs.rm(buildDir, { recursive: true, force: true });
      } catch (cleanupError) {
        logger.warn('Failed to clean up build directory', { buildId, error: cleanupError.message });
      }

      logger.error('Scaffold generation failed', { buildId, error: error.message });
      throw error;
    }
  }

  /**
   * Retrieves a generated scaffold ZIP file
   */
  async getScaffoldZip(buildId: string): Promise<Buffer | null> {
    try {
      const zipPath = path.join(this.buildsDir, `${buildId}.zip`);
      const zipBuffer = await fs.readFile(zipPath);
      return zipBuffer;
    } catch (error) {
      logger.warn('Failed to retrieve scaffold ZIP', { buildId, error: error.message });
      return null;
    }
  }

  /**
   * Analyzes a FHIR Capability Statement
   */
  async analyzeCapabilityStatement(url: string): Promise<CapabilityAnalysis> {
    try {
      logger.info('Analyzing capability statement', { url });

      const response = await axios.get(url, {
        headers: {
          'Accept': 'application/fhir+json, application/json',
          'User-Agent': 'FHIR-IQ-Builder/1.0'
        },
        timeout: 10000
      });

      const capabilityStatement = response.data;
      return this.fhirAnalyzer.analyzeCapabilityStatement(capabilityStatement);

    } catch (error) {
      logger.error('Capability statement analysis failed', { url, error: error.message });

      if (error.response?.status === 404) {
        throw new Error('Capability Statement not found. Please check the URL.');
      } else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        throw new Error('Unable to connect to the FHIR server. Please check the URL and try again.');
      } else {
        throw new Error(`Failed to analyze capability statement: ${error.message}`);
      }
    }
  }

  private validateResourceSupport(requestedResources: string[], supportedResources: string[]): void {
    const unsupportedResources = requestedResources.filter(
      resource => !supportedResources.includes(resource)
    );

    if (unsupportedResources.length > 0) {
      throw new Error(
        `The FHIR server does not support the following resources: ${unsupportedResources.join(', ')}. ` +
        `Supported resources: ${supportedResources.join(', ')}`
      );
    }
  }

  private async generateApplicationStructure(
    buildDir: string,
    request: BuildRequest,
    analysis: CapabilityAnalysis
  ): Promise<void> {
    // Create build directory
    await fs.mkdir(buildDir, { recursive: true });

    // Generate application using template service
    await this.templateService.generateApplication(buildDir, {
      ...request,
      serverUrl: analysis.serverUrl,
      supportedResources: analysis.supportedResources,
      interactions: analysis.interactions,
      searchParameters: analysis.searchParameters
    });

    logger.info('Application structure generated', { buildDir, stack: request.stack });
  }

  private async createZipArchive(buildDir: string, buildId: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const buffers: Buffer[] = [];
      const archive = archiver('zip', { zlib: { level: 9 } });

      archive.on('data', (data) => buffers.push(data));
      archive.on('end', () => resolve(Buffer.concat(buffers)));
      archive.on('error', (error) => reject(error));

      // Add all files from build directory
      archive.directory(buildDir, false);
      archive.finalize();
    });
  }

  /**
   * Clean up expired builds (should be called periodically)
   */
  async cleanupExpiredBuilds(): Promise<void> {
    try {
      const files = await fs.readdir(this.buildsDir);
      const now = Date.now();
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours

      for (const file of files) {
        if (file.endsWith('.zip')) {
          const filePath = path.join(this.buildsDir, file);
          const stats = await fs.stat(filePath);

          if (now - stats.mtime.getTime() > maxAge) {
            await fs.unlink(filePath);
            logger.info('Cleaned up expired build', { file });
          }
        }
      }
    } catch (error) {
      logger.error('Failed to clean up expired builds', { error: error.message });
    }
  }
}