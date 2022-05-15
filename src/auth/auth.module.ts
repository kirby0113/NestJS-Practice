import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';

// Strategyクラス
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PrismaService } from '../prisma.service';
import { UserResolver } from '../users/users.resolver';
import { AuthResolver } from './auth.resolver';
import { UserService } from '../users/users.service';
import { TagResolver } from '../tags/tags.resolver';
import { TagService } from '../tags/tags.service';
import { DiaryResolver } from '../diaries/diaries.resolver';

@Module({
  imports: [
    PassportModule,
    // JWTを使うための設定をしている
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          // envファイルから秘密鍵を渡す
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            // 有効期間を設定
            // 指定する値は以下を参照
            // https://github.com/vercel/ms
            expiresIn: '1200000s',
          },
        };
      },
      inject: [ConfigService], // useFactoryで使う為にConfigServiceを注入する
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PrismaService,
    AuthResolver,
    UserResolver,
    UserService,
    TagResolver,
    TagService,
    DiaryResolver,
  ],
  exports: [AuthService],
})
export class AuthModule {}
