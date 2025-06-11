import { Injectable } from '@nestjs/common';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { CreateUserDto, UpdateUserDto } from '@libs/dto/user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  private client: ApolloClient<any>;

  constructor(private configService: ConfigService) {
    this.client = new ApolloClient({
      uri: this.configService.get<string>('USER_SERVICE_URL', 'http://localhost:5000/graphql'),
      cache: new InMemoryCache(),
    });
  }

  async createUser(createUserDto: CreateUserDto, headers: Record<string, string>) {
    const { data } = await this.client.mutate({
      mutation: gql`
        mutation CreateUser($input: CreateUserDto!) {
          createUser(input: $input) {
            id
            email
            name
            createdAt
            updatedAt
          }
        }
      `,
      variables: { input: createUserDto },
      context: { headers },
    });
    return data.createUser;
  }

  async getUser(id: string, headers: Record<string, string>) {
    const { data } = await this.client.query({
      query: gql`
        query GetUser($id: String!) {
          getUser(id: $id) {
            id
            email
            name
            createdAt
            updatedAt
          }
        }
      `,
      variables: { id },
      context: { headers },
    });
    return data.getUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto, headers: Record<string, string>) {
    const { data } = await this.client.mutate({
      mutation: gql`
        mutation UpdateUser($id: String!, $input: UpdateUserDto!) {
          updateUser(id: $id, input: $input) {
            id
            email
            name
            createdAt
            updatedAt
          }
        }
      `,
      variables: { id, input: updateUserDto },
      context: { headers },
    });
    return data.updateUser;
  }

  async deleteUser(id: string, headers: Record<string, string>) {
    const { data } = await this.client.mutate({
      mutation: gql`
        mutation DeleteUser($id: String!) {
          deleteUser(id: $id) {
            success
          }
        }
      `,
      variables: { id },
      context: { headers },
    });
    return data.deleteUser;
  }

  async listUsers(headers: Record<string, string>) {
    const { data } = await this.client.query({
      query: gql`
        query ListUsers {
          listUsers {
            users {
              id
              email
              name
              createdAt
              updatedAt
            }
          }
        }
      `,
      context: { headers },
    });
    return data.listUsers.users;
  }
} 