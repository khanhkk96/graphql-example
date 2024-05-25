import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from 'src/category/category.entity';
import { ItemPageDto, ItemPageOptionsDto } from './dto/item-page.dto';
import { ItemDto, ItemInputDto } from './dto/item.dto';
import { ItemEntity } from './item.entity';

@Injectable()
export class ItemService {
  constructor(
    // Khai báo Repository để kết nối db
    @InjectRepository(ItemEntity)
    private itemRepo: Repository<ItemEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {}

  async getOne(id: string): Promise<ItemDto> {
    const item = await this.itemRepo.findOneBy({
      id,
    });

    if (!item) {
      throw new NotFoundException();
    }
    return new ItemDto(item);
  }

  async getList(options: ItemPageOptionsDto): Promise<ItemPageDto> {
    const query = await this.itemRepo
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .take(options.take)
      .skip(options.skip)
      .orderBy('item.created', 'DESC');

    if (options.q) {
      query.where('(item.name LIKE :q OR category.name LIKE :q)', {
        q: `%${options.q}%`,
      });
    }

    const [items, total] = await query.getManyAndCount();

    return new ItemPageDto(items, {
      page: options.page,
      take: options.take,
      total,
    });
  }

  async create(item: ItemInputDto) {
    const itemEntity = this.itemRepo.create({ name: item.name });

    if (item.categoryId) {
      const category = await this.categoryRepo.findOneBy({
        id: item.categoryId,
      });

      if (!category) {
        throw new NotFoundException('Không tìm thấy thông tin phân loại');
      }

      itemEntity.category = category;
    }

    await this.itemRepo.save(itemEntity);

    return new ItemDto(itemEntity);
  }

  async update(id: string, item: ItemInputDto) {
    const itemEntity = await this.itemRepo.findOneBy({ id });

    if (!itemEntity) {
      throw new NotFoundException('Không tìm thấy thông tin item.');
    }

    if (item.categoryId) {
      const category = await this.categoryRepo.findOneBy({
        id: item.categoryId,
      });

      if (!category) {
        throw new NotFoundException('Không tìm thấy thông tin phân loại');
      }

      itemEntity.category = category;
    }

    await this.itemRepo.save(itemEntity);

    return new ItemDto(itemEntity);
  }

  async delete(id: string) {
    const itemEntity = await this.itemRepo.findOneBy({ id });

    if (!itemEntity) {
      throw new NotFoundException('Không tìm thấy thông tin item.');
    }

    await this.itemRepo.softDelete(itemEntity);

    return new ItemDto(itemEntity);
  }
}
