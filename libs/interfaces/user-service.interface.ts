import { Metadata } from '@grpc/grpc-js';
import { CreateUserDto, UpdateUserDto } from "@libs/dto/user.dto";
import { User } from "@libs/entity/user.entity";

export interface IUserService {
    createUser(data: CreateUserDto, metadata: Metadata): Promise<User>;
    getUser(data: { id: string }, metadata: Metadata): Promise<User>;
    updateUser(data: { id: string } & UpdateUserDto, metadata: Metadata): Promise<User|null>;
    deleteUser(data: { id: string }, metadata: Metadata): Promise<{ success: boolean }>;
    listUsers(data: { 
        page?: number;
        limit?: number;
        search?: string;
        sort?: string;
        order?: string;
    }, metadata: Metadata): Promise<{ 
        users: User[];
        total: number;
        page: number;
        limit: number;
    }>;
    listUsersWithNameCount(data: {
        page?: number;
        limit?: number;
        search?: string;
        sort?: string;
        order?: string;
    }, metadata: Metadata): Promise<{
        items: { name: string; characters: number }[];
        total: number;
    }>;
}