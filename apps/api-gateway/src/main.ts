import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { ThrottlerExceptionFilter } from './filters/throttler-exception.filter';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const logger = app.get(Logger);
  app.useLogger(logger);

  // app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new ThrottlerExceptionFilter()
  );

  app.useGlobalInterceptors();
 
  await app.listen(port);
  console.log(`API Gateway is running on: http://localhost:${port}`);
}
bootstrap(); 