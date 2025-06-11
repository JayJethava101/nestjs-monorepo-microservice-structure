import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DtoValidationPipe } from '../../../libs/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const configService = app.get(ConfigService);
  const port = configService.get<string>('USER_SERVICE_PORT', '5000');

  // Configure GraphQL
  app.enableCors();
  app.useGlobalPipes(new DtoValidationPipe());

  await app.listen(port);
  logger.log(`User Service is running on port ${port}`);
}
bootstrap(); 