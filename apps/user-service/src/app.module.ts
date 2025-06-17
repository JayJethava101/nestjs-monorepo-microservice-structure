import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { DatabaseModule } from './modules/database/database.module';
import { TestController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@libs/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, './../../../.env'),
      cache: true,
      expandVariables: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/logs'),
    SharedModule,
    UserModule,
    DatabaseModule,
  ],
  controllers: [TestController],
})
export class AppModule {} 