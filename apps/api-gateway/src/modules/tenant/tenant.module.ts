import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { Tenant } from './tenant.entity';
// import { DatabaseModule } from '../database/database.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { KmsService } from 'src/services/kms.service';
const databaseConfig = (configService: ConfigService): DataSourceOptions => ({
  type: 'postgres',
  name: 'central_db',
  host: configService.get<string>('PG_HOST', 'localhost'),
  port: configService.get<number>('PG_PORT', 5432),
  username: configService.get<string>('PG_USER', 'postgres'),
  password: configService.get<string>('PG_PASSWORD', '1234'),
  database: configService.get<string>('PG_MANAGEMENT_DB', 'sspm_central_db'),
  entities: [Tenant],
  synchronize: true,
});

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Tenant], 'central_db'), // The second parameter 'central_db' specifying that this entity belongs to that specific database connection.
  ],
  controllers: [TenantController],
  providers: [
    TenantService,
    // KmsService,
  ],
  exports: [TenantService],
})
export class TenantModule {}