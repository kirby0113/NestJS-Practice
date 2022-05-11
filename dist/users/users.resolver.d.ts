import { PrismaService } from 'src/prisma.service';
import { User } from './models/user.model';
import { UserService } from './users.service';
export declare class UserResolver {
    private prisma;
    private userService;
    constructor(prisma: PrismaService, userService: UserService);
    user(user: User): Promise<import(".prisma/client").User>;
    users(): Promise<import(".prisma/client").User[]>;
    createUser(name: string, email: string, password: string): Promise<import(".prisma/client").User>;
}
