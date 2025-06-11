import { ObjectType, Field, ID } from 'type-graphql';
import { User } from '@libs/entity/user.entity';

@ObjectType()
export class UserType implements Partial<User> {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class UsersResponse {
  @Field(() => [UserType])
  users: UserType[];
}

@ObjectType()
export class DeleteUserResponse {
  @Field()
  success: boolean;
} 