import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { TenantModule } from '../tenant/tenant.module';

@Module({
  imports: [ConfigModule, TenantModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}