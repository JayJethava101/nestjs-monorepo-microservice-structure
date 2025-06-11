import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { tap } from 'rxjs/operators';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class CorrelationInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    let correlationId = req.headers['x-correlation-id'];
    if (!correlationId) {
      correlationId = uuidv4();
      req.headers['x-correlation-id'] = correlationId;
    }
    req.correlationId = correlationId;
    this.logger.assign({ correlationId });
    return next.handle().pipe(
      tap(() => {})
    );
  }
} 