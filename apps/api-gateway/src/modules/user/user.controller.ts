import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import * as createError from 'http-errors';
import {IUserService} from "@libs/interface/user-service.interface"
import { TenantService } from '../tenant/tenant.service';
import {CreateUserDto, UpdateUserDto} from "@libs/dto/user.dto"

@Controller('users')
export class UserController {
  private userService: IUserService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc, 
  private tenantService: TenantService
) {}

  onModuleInit() {
    this.userService = this.client.getService<IUserService>('UserService');
  }

  private async prepareMetadata(tenantId: string): Promise<Metadata> {
    if (!tenantId) {
      throw createError(400, 'tenantId is required in header')
    }

    const tenant = await this.tenantService.findById(tenantId);
    if (!tenant) {
      throw createError(404, 'Tenant not found')
    }

    const metadata = new Metadata();
    metadata.add('tenant-id', tenantId);
    metadata.add('db-name', tenant.dbName);
    return metadata;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Headers('x-tenant-id') tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return this.userService.createUser(createUserDto, metadata);
  }

  @Get()
  async findAll(@Headers('x-tenant-id') tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return this.userService.listUsers({}, metadata);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Headers('x-tenant-id') tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return this.userService.getUser({ id }, metadata);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Headers('x-tenant-id') tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return this.userService.updateUser({
      id,
      ...updateUserDto
    }, metadata);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Headers('x-tenant-id') tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return this.userService.deleteUser({ id }, metadata);
  }
} 