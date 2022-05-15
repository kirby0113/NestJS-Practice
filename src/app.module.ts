import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthResolver } from './auth/auth.resolver';
import { UserModule } from './users/users.module';
import { TagModule } from './tags/tags.module';
import { DiaryModule } from './diaries/diaries.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req }) => ({ req }),
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    ConfigModule.forRoot({
      // envファイルを組み込むために使用
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    TagModule,
    DiaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthResolver],
})
export class AppModule {}
