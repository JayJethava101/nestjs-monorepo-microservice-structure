import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateTenantDto extends PartialType(CreateTenantDto) {}
