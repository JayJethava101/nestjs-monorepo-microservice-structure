import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PinoLogger } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const start = Date.now();

    return next.handle().pipe(
      tap((responseBody) => {
        const responseTime = Date.now() - start;
        this.logger.info({
          id: uuidv4(),
          endpoint: req.originalUrl || req.url,
          method: req.method,
          request_body: req.body,
          response_body: responseBody,
          status_code: res.statusCode,
          created_at: new Date().toISOString(),
          ip_address: req.ip || req.connection?.remoteAddress,
          user_agent: req.headers['user-agent'],
          userId: req.user?.id || null,
          responseTime,
          msg: 'Request completed',
        });
      })
    );
  }
} 