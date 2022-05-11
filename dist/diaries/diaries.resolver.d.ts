import { User } from '.prisma/client';
import { CreateDiaryInput } from 'src/auth/dto/create-diary.input';
import { GetDiariesInput } from 'src/auth/dto/get-diaries.input';
import { UpdateDiaryInput } from 'src/auth/dto/update-diary.input';
import { PrismaService } from 'src/prisma.service';
export declare class DiaryResolver {
    private prisma;
    constructor(prisma: PrismaService);
    createDiary(input: CreateDiaryInput, user: User): Promise<import(".prisma/client").Diary & {
        tags: import(".prisma/client").Tag[];
    }>;
    getDiaries(input: GetDiariesInput, user: User): Promise<(import(".prisma/client").Diary & {
        tags: import(".prisma/client").Tag[];
    })[]>;
    getDiary(id: number, user: User): Promise<import(".prisma/client").Diary>;
    updateDiary(input: UpdateDiaryInput, user: User): Promise<import(".prisma/client").Diary & {
        tags: import(".prisma/client").Tag[];
    }>;
    deleteDiary(id: number, user: User): Promise<{
        message: string;
    }>;
}
