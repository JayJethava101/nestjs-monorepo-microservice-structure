import { IsEmail, IsString, IsUUID, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class CreateInvitationDto {
  @ApiProperty({
    description: 'Email address of the user to invite',
    example: 'ronak@alchemytech.ca',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Role to assign to the user',
    enum: UserRole,
    example: UserRole.ADMIN,
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    description: 'UUID of the tenant',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  tenant_id: string;
} 