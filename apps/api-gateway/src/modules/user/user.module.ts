import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserController } from './user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'USER_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'user',
            protoPath: join(__dirname, './../../../libs/proto/user.proto'),
            url: configService.get<string>('USER_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {} 