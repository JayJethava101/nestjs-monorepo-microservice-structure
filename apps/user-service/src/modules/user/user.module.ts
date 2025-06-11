import { Module, } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';


import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule,  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: true,
    playground: true,
  }),],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}