import { User } from '.prisma/client';
import { UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateDiaryInput } from '../auth/dto/create-diary.input';
import { GetDiariesInput } from '../auth/dto/get-diaries.input';
import { UpdateDiaryInput } from '../auth/dto/update-diary.input';
import { CurrentUser, JwtAuthGuard } from '../auth/guards/jwt-guard';
import { MessageResponse } from '../models/response.model';
import { PrismaService } from '../prisma.service';
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

  @Mutation(() => Diary)
  @UseGuards(JwtAuthGuard)
  async updateDiary(
    @Args('updateDiaryInput') input: UpdateDiaryInput,
    @CurrentUser() user: User,
  ) {
    const diary = await this.prisma.diary.findFirst({
      where: { id: input.id, user_id: user.id },
    });
    if (diary === null)
      throw new HttpException(
        'その日記は存在しないか、編集権限がありません。',
        HttpStatus.NOT_FOUND,
      );
    return this.prisma.diary.update({
      where: {
        id: input.id,
      },
      data: {
        title: input.title,
        detail: input.detail,
        tags: {
          set: [],
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

  @Mutation(() => MessageResponse)
  @UseGuards(JwtAuthGuard)
  async deleteDiary(@Args('id') id: number, @CurrentUser() user: User) {
    const diary = await this.prisma.diary.findFirst({
      where: { id: id, user_id: user.id },
      include: {
        tags: true,
      },
    });
    if (diary === null)
      throw new HttpException(
        'その日記は既に存在しないか、削除権限がありません。',
        HttpStatus.NOT_FOUND,
      );
    const delete_relation = diary.tags.map((tag) => {
      return this.prisma.tag.update({
        where: { id: tag.id },
        data: { diaries: { disconnect: [{ id: id }] } },
      });
    });

    const delete_diary = this.prisma.diary.delete({ where: { id: id } });

    await this.prisma.$transaction([...delete_relation, delete_diary]);
    return { message: '日記の削除に成功しました！' };
  }
}
