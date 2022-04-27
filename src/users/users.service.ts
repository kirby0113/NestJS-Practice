import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { PrismaService } from 'src/prisma.service';
import { UserResolver } from './users.resolver';

export class UserService {
  constructor(private prisma: PrismaService) {}

  getUser(id: number) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }
}
