import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
  imports: [AuthModule],
  providers: [PrismaService, UserResolver, UserService],
})
export class UserModule {}
