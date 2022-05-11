import { PrismaService } from '../prisma.service';
import { Tag } from '@prisma/client';
import { CreateTag } from './models/tag.model';
export declare class TagService {
    private prisma;
    constructor(prisma: PrismaService);
    createTag(data: CreateTag): import(".prisma/client").Prisma.Prisma__TagClient<Tag>;
}
