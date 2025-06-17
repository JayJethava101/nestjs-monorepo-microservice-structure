import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { Tenant } from './modules/tenant/tenant.entity';
import { join } from 'path';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { SharedModule } from '@libs/shared.module';

@Module({
  imports: [
    // Global configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, './../../../.env'),
      cache: true,
      expandVariables: true,
    }),
    
    // MongoDB connection
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/logs'),
    
    // Rate limiting configuration
    ThrottlerModule.forRoot([{
      ttl: 60000, // Time window in mili seconds
      limit: 10, // Maximum number of requests within the time window
    }]),
    
    // Central management database connection
    TypeOrmModule.forRoot({
      name: 'central_db',
      type: 'postgres',
      host: process.env.PG_HOST || 'localhost',
      port: 5432,
      username: process.env.PG_USER || 'postgres',
      password: process.env.PG_PASSWORD || '1234',
      database: process.env.PG_MANAGEMENT_DB || 'sspm_central_db',
      entities: [Tenant],
      synchronize: true, // todo: Set to false in production
    }),
    SharedModule,
    UserModule,
    TenantModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {} 