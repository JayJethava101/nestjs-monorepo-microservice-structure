import { Injectable, Logger } from '@nestjs/common';
import { User } from '../../../../../libs/entity/user.entity';
import {CreateUserDto, UpdateUserDto } from "@libs/dto/user.dto"
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { ResourceInternalException, ResourceNotFoundException } from '../../../../../libs/exceptions/grpc-base.exception';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly MODULE_NAME = 'user';

  constructor(private databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto, dbOptions: { tenantId: string, dbName: string }): Promise<User> {
    try {
      const connection = await this.databaseService.getTenantConnection(dbOptions.tenantId, dbOptions.dbName);
      const userRepository = connection.getRepository(User);
      const user = userRepository.create(createUserDto);
      const savedUser = await userRepository.save(user);
      return savedUser;
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`);
      throw new ResourceInternalException('Failed to create user', this.MODULE_NAME);
    }
  }

  async findAll(dbOptions: { tenantId: string, dbName: string }): Promise<User[]> {
    try {
      const connection = await this.databaseService.getTenantConnection(dbOptions.tenantId, dbOptions.dbName);
      const userRepository = connection.getRepository(User);
      return userRepository.find();
    } catch (error) {
      this.logger.error(`Error fetching users: ${error.message}`);
      if (error instanceof ResourceNotFoundException) {
        throw error;
      }
      throw new ResourceInternalException(
        `Failed to fetch users: ${error.message}`,
        this.MODULE_NAME
      );
    }
  }

  async findOne(id: string, dbOptions: { tenantId: string, dbName: string }): Promise<User | null> {
    try {
      this.logger.log(`Fetching user with ID: ${id}`);
      const connection = await this.databaseService.getTenantConnection(dbOptions.tenantId, dbOptions.dbName);
      const userRepository = connection.getRepository(User);
      const user = await userRepository.findOne({ where: { id } });
      
      if (!user) {
        throw new ResourceNotFoundException('User', id, this.MODULE_NAME);
      }
      
      this.logger.log(`User found with ID: ${id}`);
      return user;  
    } catch (error) {
      this.logger.error(`Error fetching user: ${error.message}`);
      if (error instanceof ResourceNotFoundException) {
        throw error;
      }
      throw new ResourceInternalException(
        `Failed to fetch user: ${error.message}`,
        this.MODULE_NAME
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto, dbOptions: { tenantId: string, dbName: string }): Promise<User | null> {
    try {
      this.logger.log(`Updating user with ID: ${id}`);
      const user = await this.findOne(id, dbOptions);
      
      if (!user) {
        throw new ResourceNotFoundException('User', id, this.MODULE_NAME);
      }

      const updatedUser = {
        ...user,
        ...updateUserDto,
        updatedAt: new Date(),
      };
      
      const connection = await this.databaseService.getTenantConnection(dbOptions.tenantId, dbOptions.dbName);
      const userRepository = connection.getRepository(User);
      await userRepository.save(updatedUser);
      this.logger.log(`User updated successfully with ID: ${id}`);
      return updatedUser;
    } catch (error) {
      this.logger.error(`Error updating user: ${error.message}`);
      if (error instanceof ResourceNotFoundException) {
        throw error;
      }
      throw new ResourceInternalException('Failed to update user', this.MODULE_NAME);
    }
  }

  async remove(id: string, dbOptions: { tenantId: string, dbName: string }): Promise<void> {
    try {
      this.logger.log(`Deleting user with ID: ${id}`);
      const user = await this.findOne(id, dbOptions);
      
      if (!user) {
        throw new ResourceNotFoundException('User', id, this.MODULE_NAME);
      }
      
      const connection = await this.databaseService.getTenantConnection(dbOptions.tenantId, dbOptions.dbName);
      const userRepository = connection.getRepository(User);
      await userRepository.remove(user);
      this.logger.log(`User deleted successfully with ID: ${id}`);
    } catch (error) {
      this.logger.error(`Error deleting user: ${error.message}`);
      if (error instanceof ResourceNotFoundException) {
        throw error;
      }
      throw new ResourceInternalException('Failed to delete user', this.MODULE_NAME);
    }
  }
} 