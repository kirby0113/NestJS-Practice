import { User } from '.prisma/client';
import { UseGuards, Request } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserAuth } from 'src/auth/dto/user-auth';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser, JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { PrismaService } from 'src/prisma.service';
import { Tag } from './models/tag.model';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Tag])
  @UseGuards(JwtAuthGuard)
  async tags(@CurrentUser() user: User) {
    return this.prisma.tag.findMany({ where: { user_id: user.id } });
  }

  @Query(() => Number)
  @UseGuards(JwtAuthGuard)
  async test(@Context() context) {
    return context.id;
  }
}
