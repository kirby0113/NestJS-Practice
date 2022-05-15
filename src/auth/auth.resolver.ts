import bcrypt = require('bcrypt');

import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { LoginResponse } from '../auth/dto/login-response';
import { LoginUserInput } from '../auth/dto/login-user.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { PrismaService } from '../prisma.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private prisma: PrismaService,
  ) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => LoginResponse)
  async register(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const registered_user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (registered_user) {
      throw new HttpException(
        '既に使用されているメールアドレスです。',
        HttpStatus.CONFLICT,
      );
    }
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
      },
    });
    return this.authService.login(user);
  }
}
