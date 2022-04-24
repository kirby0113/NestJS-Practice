import bcrypt = require('bcrypt');
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { UserResolver } from 'src/users/users.resolver';

type PasswordOmitUser = Omit<User, 'password'>;

export interface JwtPayload {
  userId: User['id'];
  username: User['name'];
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userResolver: UserResolver,
  ) {}

  //ユーザー認証
  async validateUser(
    name: User['name'],
    password: User['password'],
  ): Promise<PasswordOmitUser | null> {
    const user = await this.userResolver.user(name);

    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user; //パスワード情報は捨てる

      return result;
    }
    return null;
  }

  //jwt tokenを返す
  async login(user: PasswordOmitUser) {
    //jwtにつけるPayload情報
    const payload: JwtPayload = { userId: user.id, username: user.name };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
