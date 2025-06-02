import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {IUserService} from "@libs/interface/user-service.interface"
import {CreateUserDto, UpdateUserDto} from "@libs/dto/user.dto"


@Controller('users')
export class UserController {
  private userService: IUserService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<IUserService>('UserService');
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
    // console.log('update user called in the api gateway', { id, ...updateUserDto });
    return this.userService.updateUser({
      id,
      ...updateUserDto
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser({ id });
  }
} 