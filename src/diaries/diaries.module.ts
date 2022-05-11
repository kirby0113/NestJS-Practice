import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma.service';
import { DiaryResolver } from './diaries.resolver';

@Module({
  imports: [AuthModule],
  providers: [PrismaService, DiaryResolver],
})
export class DiaryModule {}
