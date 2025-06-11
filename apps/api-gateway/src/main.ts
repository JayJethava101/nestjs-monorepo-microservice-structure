import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { ThrottlerExceptionFilter } from './filters/throttler-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  // app.useGlobalPipes(new ValidationPipe());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('SSPM')
    .setDescription('The API Gateway documentation')
    .setVersion('1.0')
    .addTag('users')
    .addTag('tenants')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new ThrottlerExceptionFilter()
  );
 
  await app.listen(port);
  console.log(`API Gateway is running on: http://localhost:${port}`);
  console.log(`Swagger documentation is available at: http://localhost:${port}/api-docs`);
}
bootstrap(); 