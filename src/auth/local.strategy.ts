import { Strategy as BaseLocalStrategy } from 'passport-local';

import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/models/user.model';

type PasswordOmitUser = Omit<User, 'password'>;

@Injectable()
export class LocalStrategy extends PassportStrategy(BaseLocalStrategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    name: User['name'],
    pass: User['password'],
  ): Promise<PasswordOmitUser | null> {
    const user = await this.authService.validateUser(name, pass);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
