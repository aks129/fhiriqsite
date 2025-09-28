import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Determine status code
  const statusCode = err.statusCode || 500;

  // Determine if error details should be exposed
  const isProduction = process.env.NODE_ENV === 'production';
  const shouldExposeDetails = !isProduction || err.isOperational;

  // Prepare error response
  const errorResponse: any = {
    error: shouldExposeDetails ? err.message : 'Internal Server Error',
    timestamp: new Date().toISOString(),
    requestId: req.headers['x-request-id'] || 'unknown'
  };

  // Add stack trace in development
  if (!isProduction) {
    errorResponse.stack = err.stack;
    errorResponse.details = {
      url: req.url,
      method: req.method,
      body: req.body,
      query: req.query,
      params: req.params
    };
  }

  res.status(statusCode).json(errorResponse);
};

export const createAppError = (message: string, statusCode: number = 500): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};