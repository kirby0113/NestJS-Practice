import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma.service';
import { TagResolver } from './tags.resolver';
import { TagService } from './tags.service';

@Module({
  imports: [AuthModule],
  providers: [PrismaService, TagService, TagResolver],
})
export class TagModule {}
