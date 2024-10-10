import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ExampleResolver } from './example/example.resolver';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: process.env.NODE_ENV !== 'production',
      installSubscriptionHandlers: true,
    }),
    ExampleModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, ExampleResolver],
})
export class AppModule {}
