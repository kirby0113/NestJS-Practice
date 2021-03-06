import { User } from '.prisma/client';
import { UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, JwtAuthGuard } from '../auth/guards/jwt-guard';
import { PrismaService } from '../prisma.service';
import { Tag } from './models/tag.model';
import { TagService } from './tags.service';
import { MessageResponse } from '../models/response.model';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private prisma: PrismaService, private tagService: TagService) {}

  @Query(() => [Tag])
  @UseGuards(JwtAuthGuard)
  async tags(@CurrentUser() user: User) {
    return this.prisma.tag.findMany({ where: { user_id: user.id } });
  }

  @Mutation(() => Tag)
  @UseGuards(JwtAuthGuard)
  async createTag(@Args('name') name: string, @CurrentUser() user: User) {
    const trim_name = name.trim();
    if (trim_name === '')
      throw new HttpException(
        'タグ名を入力してください',
        HttpStatus.BAD_REQUEST,
      );
    const registeredTag = await this.prisma.tag.findFirst({
      where: { name: trim_name },
    });
    if (registeredTag !== null)
      throw new HttpException('そのタグは登録済みです', HttpStatus.CONFLICT);
    return this.prisma.tag.create({
      data: { name: trim_name, user_id: user.id },
    });
  }

  @Mutation(() => Tag)
  @UseGuards(JwtAuthGuard)
  async updateTag(
    @Args('id') id: number,
    @Args('name') name: string,
    @CurrentUser() user: User,
  ) {
    const registeredTag = await this.prisma.tag.findFirst({
      where: { id: id },
    });
    if (registeredTag === null)
      throw new HttpException('そのタグは存在しません', HttpStatus.NOT_FOUND);

    const trim_name = name.trim();
    if (trim_name === '')
      throw new HttpException(
        'タグ名を入力してください',
        HttpStatus.BAD_REQUEST,
      );
    return this.prisma.tag.update({
      where: { id: id },
      data: { name: trim_name },
    });
  }

  @Mutation(() => MessageResponse)
  @UseGuards(JwtAuthGuard)
  async deleteTag(@Args('id') id: number, @CurrentUser() user: User) {
    const registeredTag = await this.prisma.tag.findFirst({
      where: { id: id },
    });
    if (registeredTag === null)
      throw new HttpException('そのタグは存在しません', HttpStatus.NOT_FOUND);

    const relation = this.prisma.tag.update({
      where: {
        id: id,
      },
      data: {
        diaries: {
          set: [],
        },
      },
    });

    const tag = this.prisma.tag.delete({
      where: { id: id },
    });

    await this.prisma.$transaction([relation, tag]);

    return { message: '削除に成功しました！' };
  }
}
