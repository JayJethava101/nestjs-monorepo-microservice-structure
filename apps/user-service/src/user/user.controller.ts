import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from '@libs/dto/user/create-user.dto';
import { UpdateUserDto } from '@libs/dto/user/update-user.dto';
import { UserResponseDto } from '@libs/dto/user/user-response.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'CreateUser')
  create(createUserDto: CreateUserDto): UserResponseDto {
    return this.userService.create(createUserDto);
  }

  @GrpcMethod('UserService', 'GetUser')
  findOne(data: { id: string }): UserResponseDto | null {
    const user = this.userService.findOne(data.id);
    return user || null;
  }

  @GrpcMethod('UserService', 'UpdateUser')
  update(data: { id: string; updateUserDto: UpdateUserDto }): UserResponseDto | null {
    const { id, updateUserDto } = data;
    return this.userService.update(id, updateUserDto);
  }

  @GrpcMethod('UserService', 'DeleteUser')
  remove(data: { id: string }): { success: boolean } {
    const success = this.userService.remove(data.id);
    return { success };
  }

  @GrpcMethod('UserService', 'ListUsers')
  findAll(): { users: UserResponseDto[] } {
    const users = this.userService.findAll();
    return { users };
  }
} 