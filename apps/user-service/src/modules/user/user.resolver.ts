import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@libs/dto/user.dto';
import { UserType, UsersResponse, DeleteUserResponse } from './user.types';
import { Context } from '../database/context';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserType)
  async createUser(
    @Arg('input') createUserDto: CreateUserDto,
    @Ctx() context: Context
  ): Promise<UserType> {
    return this.userService.create(createUserDto, context);
  }

  @Query(() => UserType)
  async getUser(
    @Arg('id') id: string,
    @Ctx() context: Context
  ): Promise<UserType> {
    const user = await this.userService.findOne(id, context);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  @Mutation(() => UserType)
  async updateUser(
    @Arg('id') id: string,
    @Arg('input') updateUserDto: UpdateUserDto,
    @Ctx() context: Context
  ): Promise<UserType> {
    const user = await this.userService.update(id, updateUserDto, context);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  @Mutation(() => DeleteUserResponse)
  async deleteUser(
    @Arg('id') id: string,
    @Ctx() context: Context
  ): Promise<DeleteUserResponse> {
    await this.userService.remove(id, context);
    return { success: true };
  }

  @Query(() => UsersResponse)
  async listUsers(
    @Ctx() context: Context
  ): Promise<UsersResponse> {
    const users = await this.userService.findAll(context);
    return { users };
  }
} 