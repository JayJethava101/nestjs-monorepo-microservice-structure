import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, OnModuleInit } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import * as createError from 'http-errors';
import { IUserService } from "@libs/interface/user-service.interface"
import { TenantService } from '../tenant/tenant.service';
import { CreateUserDto, UpdateUserDto } from "@libs/dto/user.dto"
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController implements OnModuleInit {
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

  @ApiOperation({ summary: 'Create a new user' })
  @ApiHeader({ name: 'x-tenant-id', required: true, description: 'Tenant ID' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Tenant not found.' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Headers('x-tenant-id') tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return this.userService.createUser(createUserDto, metadata);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiHeader({ name: 'x-tenant-id', required: true, description: 'Tenant ID' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Tenant not found.' })
  @Get()
  async findAll(@Headers('x-tenant-id') tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return this.userService.listUsers({}, metadata);
  }

  @ApiOperation({ summary: 'Get a user by id' })
  @ApiHeader({ name: 'x-tenant-id', required: true, description: 'Tenant ID' })
  @ApiResponse({ status: 200, description: 'Return the user.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'User or tenant not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Headers('x-tenant-id') tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return this.userService.getUser({ id }, metadata);
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiHeader({ name: 'x-tenant-id', required: true, description: 'Tenant ID' })
  @ApiResponse({ status: 200, description: 'User successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'User or tenant not found.' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Headers('x-tenant-id') tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return this.userService.updateUser({
      id,
      ...updateUserDto
    }, metadata);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiHeader({ name: 'x-tenant-id', required: true, description: 'Tenant ID' })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'User or tenant not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string, @Headers('x-tenant-id') tenantId: string) {
    const metadata = await this.prepareMetadata(tenantId);
    return this.userService.deleteUser({ id }, metadata);
  }
} 