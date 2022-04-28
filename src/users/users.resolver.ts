import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserAuth } from 'src/auth/dto/user-auth';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { PrismaService } from 'src/prisma.service';
import { User } from './models/user.model';
import { UserService } from './users.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async user(@Context() context) {
    return this.prisma.user.findFirst({ where: { id: context.id } });
  }

  @Query(() => [User])
  async users() {
    return this.prisma.user.findMany();
  }

  @Mutation(() => User)
  async createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.prisma.user.create({ data: { name, email, password } });
  }
}
