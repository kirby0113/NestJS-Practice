import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, JwtAuthGuard } from '../auth/guards/jwt-guard';
import { PrismaService } from '../prisma.service';
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
  async user(@CurrentUser() user: User) {
    return this.prisma.user.findFirst({ where: { id: user.id } });
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
