import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@libs/dto/user.dto';
import { TenantService } from '../tenant/tenant.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tenantService: TenantService,
  ) {}

  private async prepareHeaders(tenantId: string): Promise<Record<string, string>> {
    const tenant = await this.tenantService.findById(tenantId);
    return {
      'x-tenant-id': tenantId,
      'x-db-name': tenant?.dbName || '',
    };
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Headers('x-tenant-id') tenantId: string) {
    const headers = await this.prepareHeaders(tenantId);
    return this.userService.createUser(createUserDto, headers);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Headers('x-tenant-id') tenantId: string) {
    const headers = await this.prepareHeaders(tenantId);
    return this.userService.getUser(id, headers);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Headers('x-tenant-id') tenantId: string,
  ) {
    const headers = await this.prepareHeaders(tenantId);
    return this.userService.updateUser(id, updateUserDto, headers);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Headers('x-tenant-id') tenantId: string) {
    const headers = await this.prepareHeaders(tenantId);
    return this.userService.deleteUser(id, headers);
  }

  @Get()
  async findAll(@Headers('x-tenant-id') tenantId: string) {
    const headers = await this.prepareHeaders(tenantId);
    return this.userService.listUsers(headers);
  }
} 