import { User } from '.prisma/client';
import { UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { truncate } from 'fs';
import { CreateDiaryInput } from 'src/auth/dto/create-diary.input';
import { CurrentUser, JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { PrismaService } from 'src/prisma.service';
import { InputTag, Tag } from 'src/tags/models/tag.model';
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
}
