import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { GrpcExceptionFilter } from '../../../libs/filters/grpc-exception.filter';
import { Logger } from '@nestjs/common';
import { DtoValidationPipe } from '../../../libs/pipes/validation.pipe';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: process.env.USER_SERVICE_PKG || 'user',
      protoPath: join(__dirname, '../../../libs/proto/user.proto'),
      url: process.env.USER_SERVICE_URL || 'localhost:5000',
    },
  });

  const logger = new Logger('Bootstrap');
  const configService = app.get(ConfigService);
  const port = configService.get<string>('USER_SERVICE_URL', 'localhost:5000').split(':')[1] || '5000';
  const serviceName = configService.get<string>('USER_SERVICE_PKG', 'user')

  // Use custom validation pipe
  app.useGlobalPipes(new DtoValidationPipe());

  // Use custom exception filter
  app.useGlobalFilters(new GrpcExceptionFilter(serviceName));

  await app.listen();
  logger.log(`User Service is running on port ${port}`);
}
bootstrap(); 