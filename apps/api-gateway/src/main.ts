import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { ThrottlerExceptionFilter } from './filters/throttler-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from '@libs/interceptors/transform.interceptor';
import { DataSource } from 'typeorm'; // Import DataSource

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  // Get the DataSource instance and initialize it
  const dataSource = app.get(DataSource); // Get DataSource from the app context
  await dataSource.initialize(); // Make sure to initialize the connection

  // Global filters
  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new ThrottlerExceptionFilter(),
  );

  // Global interceptors
  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('The API Gateway for the microservices architecture')
    .setVersion('1.0')
    .addTag('users')
    .addTag('tenants')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`API Gateway is running on: http://localhost:${port}`);
  console.log(`Swagger documentation is available at: http://localhost:${port}/api`);
}

bootstrap();
