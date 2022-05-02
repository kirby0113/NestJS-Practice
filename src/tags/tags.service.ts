import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { PrismaService } from '../prisma.service';
import { Tag } from '@prisma/client';
import { CreateTag } from './models/tag.model';

export class TagService {
  constructor(private prisma: PrismaService) {}

  createTag(data: CreateTag) {
    return this.prisma.tag.create({ data: data });
  }
}
