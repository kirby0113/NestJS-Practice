import { User } from '.prisma/client';
import { UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateDiaryInput } from 'src/auth/dto/create-diary.input';
import { GetDiariesInput } from 'src/auth/dto/get-diaries.input';
import { CurrentUser, JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { PrismaService } from 'src/prisma.service';
import { Diary } from './models/diary.model';

@Resolver(() => Diary)
export class DiaryResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation(() => Diary)
  @UseGuards(JwtAuthGuard)
  async createDiary(
    @Args('createDiaryInput') input: CreateDiaryInput,
    @CurrentUser() user: User,
  ) {
    const trim_title = input.title.trim();
    const trim_detail = input.detail.trim();
    if (trim_title === '' || trim_detail === '')
      throw new HttpException(
        '必要な項目が入力されていません',
        HttpStatus.BAD_REQUEST,
      );

    return this.prisma.diary.create({
      data: {
        title: trim_title,
        detail: trim_detail,
        created_at: new Date(),
        user_id: user.id,
        tags: {
          connect: input.tags.map((tag) => {
            return { id: tag.id };
          }),
        },
      },
      include: {
        tags: true,
      },
    });
  }

  @Query(() => [Diary])
  @UseGuards(JwtAuthGuard)
  async getDiaries(
    @Args('getDiariesInput') input: GetDiariesInput,
    @CurrentUser() user: User,
  ) {
    const order = input.order_asc ? input.order_asc : false;

    if (input.tag_id === undefined) {
      return this.prisma.diary.findMany({
        where: {
          user_id: user.id,
        },
        orderBy: {
          created_at: order ? 'asc' : 'desc',
        },
        include: {
          tags: true,
        },
      });
    }

    return this.prisma.diary.findMany({
      where: {
        user_id: user.id,
        tags: {
          some: {
            id: input.tag_id,
          },
        },
      },
      orderBy: {
        created_at: order ? 'asc' : 'desc',
      },
      include: {
        tags: true,
      },
    });
  }

  @Query(() => Diary)
  @UseGuards(JwtAuthGuard)
  async getDiary(@Args('id') id: number, @CurrentUser() user: User) {
    const diary = await this.prisma.diary.findUnique({ where: { id: id } });
    if (diary === null)
      throw new HttpException('その日記は存在しません', HttpStatus.NOT_FOUND);
    return diary;
  }
}
