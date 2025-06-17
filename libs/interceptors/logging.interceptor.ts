import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { UAParser } from 'ua-parser-js';
import { LoggingService } from '../services/logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  private readonly excludedPaths: string[];
  private readonly sensitiveHeaders = ['authorization', 'cookie', 'set-cookie'];

  constructor(
    private readonly loggingService: LoggingService,
    private readonly configService: ConfigService,
  ) {
    this.excludedPaths = this.configService.get<string[]>('LOGGING_EXCLUDED_PATHS', [
      '/health',
      '/metrics',
      '/favicon.ico',
    ]);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    // Skip logging for excluded paths
    if (this.shouldSkipLogging(request)) {
      return next.handle();
    }

    const startTime = Date.now();
    const parser = new UAParser(request.headers['user-agent']);

    // Ensure header values are always strings
    const requestId = Array.isArray(request.headers['x-request-id']) 
      ? request.headers['x-request-id'][0] 
      : request.headers['x-request-id'] || this.generateRequestId();

    const tenantId = Array.isArray(request.headers['x-tenant-id'])
      ? request.headers['x-tenant-id'][0]
      : request.headers['x-tenant-id'];

    const correlationId = Array.isArray(request.headers['x-correlation-id'])
      ? request.headers['x-correlation-id'][0]
      : request.headers['x-correlation-id'];

    const sessionId = Array.isArray(request.headers['x-session-id'])
      ? request.headers['x-session-id'][0]
      : request.headers['x-session-id'];

    const requestData = {
      request_id: requestId,
      method: request.method,
      url: request.originalUrl,
      request_body: this.sanitizeData(request.body),
      request_headers: this.sanitizeHeaders(request.headers),
      device_info: parser.getResult(),
      userId: (request as any).user?.id,
      tenant_id: tenantId,
      correlation_id: correlationId,
      session_id: sessionId,
      service_name: this.configService.get<string>('SERVICE_NAME', 'api-gateway'),
    };

    return next.handle().pipe(
      tap({
        next: (responseBody) => {
          const responseTime = Date.now() - startTime;
          this.loggingService.log({
            ...requestData,
            response_body: this.sanitizeData(responseBody),
            response_headers: this.sanitizeHeaders(response.getHeaders()),
            status_code: response.statusCode,
            response_time: responseTime,
            payload_size: this.calculatePayloadSize(responseBody),
          });
        },
        error: (error) => {
          const responseTime = Date.now() - startTime;
          this.loggingService.log({
            ...requestData,
            response_body: this.sanitizeData(error.response || {}),
            response_headers: this.sanitizeHeaders(response.getHeaders()),
            status_code: error.status || 500,
            response_time: responseTime,
            payload_size: this.calculatePayloadSize(error.response),
            error_details: {
              message: error.message,
              stack: error.stack,
              code: error.code,
            },
          });
        },
      }),
    );
  }

  private shouldSkipLogging(request: Request): boolean {
    return this.excludedPaths.some((path) => request.path.startsWith(path));
  }

  private generateRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private calculatePayloadSize(data: any): number {
    try {
      return Buffer.byteLength(JSON.stringify(data));
    } catch {
      return 0;
    }
  }

  private sanitizeData(data: any): any {
    if (!data) return data;
    if (typeof data !== 'object') return data;

    const sanitized = { ...data };
    const sensitiveFields = ['password', 'token', 'secret', 'key'];

    Object.keys(sanitized).forEach((key) => {
      if (sensitiveFields.some((field) => key.toLowerCase().includes(field))) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof sanitized[key] === 'object') {
        sanitized[key] = this.sanitizeData(sanitized[key]);
      }
    });

    return sanitized;
  }

  private sanitizeHeaders(headers: Record<string, any>): Record<string, string> {
    const sanitized: Record<string, string> = {};

    for (const [key, value] of Object.entries(headers)) {
      sanitized[key] = this.sensitiveHeaders.includes(key.toLowerCase())
        ? '[REDACTED]'
        : String(value);
    }

    return sanitized;
  }
} 