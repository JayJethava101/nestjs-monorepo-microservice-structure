import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateUserDto } from '@libs/dto/user/create-user.dto';
import { UpdateUserDto } from '@libs/dto/user/update-user.dto';
import { UserResponseDto } from '@libs/dto/user/user-response.dto';

interface UserService {
  createUser(data: CreateUserDto): UserResponseDto;
  getUser(data: { id: string }): UserResponseDto;
  updateUser(data: { id: string; updateUserDto: UpdateUserDto }): UserResponseDto;
  deleteUser(data: { id: string }): { success: boolean };
  listUsers(data: {}): { users: UserResponseDto[] };
}

@Controller('users')
export class UserController {
  private userService: UserService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.listUsers({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.getUser({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({ id, updateUserDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser({ id });
  }
} 