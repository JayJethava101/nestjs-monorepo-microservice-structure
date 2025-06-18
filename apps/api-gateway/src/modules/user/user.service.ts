import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import * as createError from 'http-errors';
import { IUserService } from '@libs/interfaces/user-service.interface';
import { TenantService } from '../tenant/tenant.service';
import { CreateUserDto, UpdateUserDto } from '@libs/dto/user.dto';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: IUserService;

  constructor(
    @Inject('USER_PACKAGE') private client: ClientGrpc,
    private tenantService: TenantService,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<IUserService>('UserService');
  }

  private async prepareMetadata(tenantId: string): Promise<Metadata> {
    if (!tenantId) {
      throw createError(400, 'tenantId is required in header');
    }

    const tenant = await this.tenantService.findById(tenantId);
    if (!tenant) {
      throw createError(404, 'Tenant not found');
    }

    const metadata = new Metadata();
    metadata.add('tenant-id', tenantId);
    metadata.add('db-name', tenant.dbName);
    return metadata;
  }

  async findNameCounts(tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return this.userService.listUsersWithNameCount({}, metadata);
  }

  async create(createUserDto: CreateUserDto, tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return this.userService.createUser(createUserDto, metadata);
  }

  async findAll(tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return this.userService.listUsers({}, metadata);
  }

  async findOne(id: string, tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return this.userService.getUser({ id }, metadata);
  }

  async update(id: string, updateUserDto: UpdateUserDto, tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return this.userService.updateUser({
      id,
      ...updateUserDto
    }, metadata);
  }

  async remove(id: string, tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return this.userService.deleteUser({ id }, metadata);
  }

  // Additional business logic methods can be added here
  async findUsersByEmail(email: string, tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    // This would require adding a corresponding method to the gRPC service
    // For now, we'll get all users and filter by email
    const allUsers = await this.userService.listUsers({}, metadata);
    return allUsers.users?.filter(user => user.email === email) || [];
  }

  async findActiveUsers(tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    // Since the User entity doesn't have an isActive property,
    // we'll return all users for now. This can be enhanced when the entity is updated
    const allUsers = await this.userService.listUsers({}, metadata);
    return allUsers.users || [];
  }

  async getUserCount(tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    const allUsers = await this.userService.listUsers({}, metadata);
    return allUsers.users?.length || 0;
  }
} 