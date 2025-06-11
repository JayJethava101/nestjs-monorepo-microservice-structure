import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe'
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
    required: false
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
    required: false
  })
  @IsString()
  @IsOptional()
  name: string;
}
