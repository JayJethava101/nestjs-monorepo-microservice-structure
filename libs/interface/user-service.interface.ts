import { CreateUserDto, UpdateUserDto } from "@libs/dto/user.dto";
import { User } from "@libs/entity/user.entity";

export interface IUserService {
    createUser(data: CreateUserDto): Promise<User>;
    getUser(data: { id: string }): Promise<User>;
    updateUser(data: { id: string } & UpdateUserDto): Promise<User|null>;
    deleteUser(data: { id: string }): Promise<void>;
    listUsers(data: {}): Promise<{ users: User[] }>;
  }