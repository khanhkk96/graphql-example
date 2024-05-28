import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';
import { CategoryEntity } from './category.entity';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';

export const PUB_SUB = 'PUB_SUB';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), ConfigModule],
  providers: [
    CategoryResolver,
    CategoryService,
    // {
    //   provide: PUB_SUB,
    //   useFactory: (configService: ConfigService) =>
    //     new RedisPubSub({
    //       connection: {
    //         host: configService.get('REDIS_HOST'),
    //         port: configService.get('REDIS_PORT'),
    //       },
    //     }),
    //   inject: [ConfigService],
    // },
    {
      provide: PUB_SUB,
      useValue: new PubSub(),
    },
  ],
  exports: [PUB_SUB],
})
export class CategoryModule {}
