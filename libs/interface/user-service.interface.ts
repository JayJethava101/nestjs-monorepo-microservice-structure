import { Metadata } from '@grpc/grpc-js';
import { CreateUserDto, UpdateUserDto } from "@libs/dto/user.dto";
import { User } from "@libs/entity/user.entity";

export interface IUserService {
    createUser(data: CreateUserDto,  metadata: Metadata): Promise<User>;
    getUser(data: { id: string }, metadata: Metadata): Promise<User>;
    updateUser(data: { id: string } & UpdateUserDto,  metadata: Metadata): Promise<User|null>;
    deleteUser(data: { id: string },  metadata: Metadata): Promise<void>;
    listUsers(data: {},  metadata: Metadata): Promise<{ users: User[] }>;
  }