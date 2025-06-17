import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiLog, ApiLogSchema } from './schemas/api-log.schema';
import { LoggingService } from './services/logging.service';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ApiLog.name, schema: ApiLogSchema },
    ]),
  ],
  providers: [LoggingService, LoggingInterceptor],
  exports: [LoggingService, LoggingInterceptor],
})
export class SharedModule {} 