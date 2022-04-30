import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma.service';
import { TagResolver } from './tags.resolver';

@Module({
  imports: [AuthModule],
  providers: [PrismaService, TagResolver],
})
export class TagModule {}
