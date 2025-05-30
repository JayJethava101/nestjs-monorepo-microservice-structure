import { User } from '../../interface/user.interface';

export class UserResponseDto implements User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
} 