import bcrypt = require('bcrypt');

import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { LoginResponse } from '../auth/dto/login-response';
import { LoginUserInput } from '../auth/dto/login-user.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { PrismaService } from '../prisma.service';
import { RegisterUserInput } from './dto/register-user.input';

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
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ) {
    const registered_user = await this.prisma.user.findUnique({
      where: { email: registerUserInput.email },
    });
    if (registered_user) {
      throw new HttpException(
        '既に使用されているメールアドレスです。',
        HttpStatus.CONFLICT,
      );
    }
    const user = await this.prisma.user.create({
      data: {
        ...registerUserInput,
        password: await bcrypt.hash(
          registerUserInput.password,
          await bcrypt.genSalt(10),
        ),
      },
    });
    return this.authService.login(user);
  }
}
