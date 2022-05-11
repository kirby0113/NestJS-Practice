import { AuthService } from 'src/auth/auth.service';
import { LoginUserInput } from 'src/auth/dto/login-user.input';
import { PrismaService } from 'src/prisma.service';
export declare class AuthResolver {
    private readonly authService;
    private prisma;
    constructor(authService: AuthService, prisma: PrismaService);
    login(loginUserInput: LoginUserInput, context: any): Promise<{
        access_token: string;
    }>;
    register(name: string, email: string, password: string): Promise<{
        access_token: string;
    }>;
}
