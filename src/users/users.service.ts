import { PrismaService } from '../prisma.service';
export class UserService {
  constructor(private prisma: PrismaService) {}

  getUser(id: number) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }
}
