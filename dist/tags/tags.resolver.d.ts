import { User } from '.prisma/client';
import { PrismaService } from 'src/prisma.service';
import { TagService } from './tags.service';
export declare class TagResolver {
    private prisma;
    private tagService;
    constructor(prisma: PrismaService, tagService: TagService);
    tags(user: User): Promise<import(".prisma/client").Tag[]>;
    createTag(name: string, user: User): Promise<import(".prisma/client").Tag>;
    updateTag(id: number, name: string, user: User): Promise<import(".prisma/client").Tag>;
    deleteTag(id: number, user: User): Promise<{
        message: string;
    }>;
}
