import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/category/category.entity';
import { ItemEntity } from './item.entity';
import { ItemResolver } from './item.resolver';
import { ItemService } from './item.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity, CategoryEntity])],
  providers: [ItemResolver, ItemService],
})
export class ItemModule {}
