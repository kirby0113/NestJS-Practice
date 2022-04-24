import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserResolver } from './users/users.resolver';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    ConfigModule.forRoot({
      // envファイルを組み込むために使用
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, PrismaService, UserResolver],
})
export class AppModule {}
