import { User } from 'src/users/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { UserResolver } from 'src/users/users.resolver';
import { PrismaService } from 'src/prisma.service';
declare type PasswordOmitUser = Omit<User, 'password'>;
export interface JwtPayload {
    email: string;
    id: number;
}
export declare class AuthService {
    private jwtService;
    private userResolver;
    private prisma;
    constructor(jwtService: JwtService, userResolver: UserResolver, prisma: PrismaService);
    validateUser(email: string, password: string): Promise<User | null>;
    login(user: PasswordOmitUser): Promise<{
        access_token: string;
    }>;
}
export {};
