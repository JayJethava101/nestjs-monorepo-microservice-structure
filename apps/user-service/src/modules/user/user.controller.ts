import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import {CreateUserDto, UpdateUserDto} from "@libs/dto/user.dto"
import { User } from '@libs/entity/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'CreateUser')
  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @GrpcMethod('UserService', 'GetUser')
  findOne(data: { id: string }): Promise<User | null> {
    const user = this.userService.findOne(data.id);
    return user || null;
  }

  @GrpcMethod('UserService', 'UpdateUser')
  async update(data: { id: string } & UpdateUserDto): Promise<User | null> {
    const { id, ...updateUserDto } = data;
    return this.userService.update(id, updateUserDto);
  }

  @GrpcMethod('UserService', 'DeleteUser')
  async remove(data: { id: string }): Promise<{ success: true}> {
    await this.userService.remove(data.id);
    return { success: true}
  }

  @GrpcMethod('UserService', 'ListUsers')
  async findAll(): Promise<{ users: User[] }> {
    const users = await this.userService.findAll();
    return { users };
  }
} 