import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { UserService } from './user.service';
import {CreateUserDto, UpdateUserDto} from "@libs/dto/user.dto"
import { User } from '@libs/entity/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  private getTenantInfo(metadata: Record<string, any>): { tenantId: string; dbName: string } {
    const tenantId = metadata.internalRepr.get('tenant-id')?.[0];
    const dbName = metadata.internalRepr.get('db-name')?.[0];

    if (!tenantId || !dbName) {
      throw new RpcException('Tenant ID and database name are required');
    }

    return { tenantId, dbName };
  }

  @GrpcMethod('UserService', 'CreateUser')
  async create(createUserDto: CreateUserDto, metadata: Record<string, any>): Promise<User> {
    const { tenantId, dbName } = this.getTenantInfo(metadata);
    return this.userService.create(createUserDto, { tenantId, dbName });
  }

  @GrpcMethod('UserService', 'GetUser')
  async findOne(data: { id: string }, metadata: Record<string, any>): Promise<User | null> {
    const { tenantId, dbName } = this.getTenantInfo(metadata);
    return this.userService.findOne(data.id, { tenantId, dbName });
  }

  @GrpcMethod('UserService', 'UpdateUser')
  async update(data: { id: string } & UpdateUserDto, metadata: Record<string, any>): Promise<User | null> {
    const { tenantId, dbName } = this.getTenantInfo(metadata);
    const { id, ...updateUserDto } = data;
    return this.userService.update(id, updateUserDto, { tenantId, dbName });
  }

  @GrpcMethod('UserService', 'DeleteUser')
  async remove(data: { id: string }, metadata: Record<string, any>): Promise<{ success: true}> {
    const { tenantId, dbName } = this.getTenantInfo(metadata);
    await this.userService.remove(data.id, { tenantId, dbName });
    return { success: true };
  }

  @GrpcMethod('UserService', 'ListUsers')
  async findAll(data: object, metadata: Record<string, any>): Promise<{ users: User[] }> {
    const { tenantId, dbName } = this.getTenantInfo(metadata);
    const users = await this.userService.findAll({ tenantId, dbName });
    return { users };
  }
} 