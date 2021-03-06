import bcrypt = require('bcrypt');
import { Injectable } from '@nestjs/common';
import { User } from '../users/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { UserResolver } from '../users/users.resolver';
import { PrismaService } from '../prisma.service';

type PasswordOmitUser = Omit<User, 'password'>;

export interface JwtPayload {
  email: string;
  id: number;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userResolver: UserResolver,
    private prisma: PrismaService,
  ) {}

  //ユーザー認証
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user; // パスワード情報を外部に出さないようにする

      return result;
    }

    return null;
    return null;
  }

  //jwt tokenを返す
  async login(user: PasswordOmitUser) {
    const payload = { email: user.email, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
