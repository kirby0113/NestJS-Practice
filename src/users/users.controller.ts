import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { User } from './models/user.model';
import { AuthService } from '../auth/auth.service';
import { UserResolver } from './users.resolver';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { Args, Context } from '@nestjs/graphql';
import { LoginUserInput } from 'src/auth/dto/login-user.input';

@Controller()
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly userResolver: UserResolver,
  ) {}

  @UseGuards(GqlAuthGuard) // passport-local戦略を付与する
  @Post('login')
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    // LocalStrategy.validate()で認証して返した値がreq.userに入ってる
    const user = context.user;
    // JwtToken を返す
    return this.authService.login(context.user);
  }

  /**
   * @description JWT認証を用いたサンプルAPI
   */
  @UseGuards(AuthGuard('jwt')) // passport-jwt戦略を付与する
  @Get('user')
  getProfile(@Request() req: { user: User }) {
    // JwtStrategy.validate()で認証して返した値がreq.userに入ってる

    // 認証に成功したユーザーの情報を返す
    return req.user;
  }

  @Get('users')
  getUsers() {
    return this.userResolver.users();
  }
}
