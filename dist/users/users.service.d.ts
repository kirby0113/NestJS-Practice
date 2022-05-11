import { PrismaService } from 'src/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getUser(id: number): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User>;
}
