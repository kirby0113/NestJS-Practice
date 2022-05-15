import { PrismaService } from '../prisma.service';
import { CreateTag } from './models/tag.model';

export class TagService {
  constructor(private prisma: PrismaService) {}

  createTag(data: CreateTag) {
    return this.prisma.tag.create({ data: data });
  }
}
