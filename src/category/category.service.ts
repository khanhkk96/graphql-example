import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import {
  CategoryPageDto,
  CategoryPageOptionsDto,
} from './dto/category-page.dto';
import { CategoryDto, CategoryInputDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}

  async getAll(pageOptions: CategoryPageOptionsDto) {
    const queryBuilder = this.categoryRepo
      .createQueryBuilder('category')
      .take(pageOptions.take)
      .skip(pageOptions.skip)
      .orderBy('category.created', 'DESC');

    if (pageOptions.q) {
      queryBuilder.andWhere('category.name LIKE :q', {
        q: `%${pageOptions.q}%`,
      });
    }

    if (pageOptions.status) {
      queryBuilder.andWhere('category.status = :status', {
        status: pageOptions.status,
      });
    }

    const [categories, total] = await queryBuilder.getManyAndCount();

    return new CategoryPageDto(categories, {
      page: pageOptions.page,
      take: pageOptions.take,
      total,
    });
  }

  async getOne(id: string) {
    const category = await this.categoryRepo.findOneBy({ id });

    if (!category) {
      throw new NotFoundException();
    }

    return new CategoryDto(category);
  }

  async create(dto: CategoryInputDto) {
    const isExistedName = await this.categoryRepo.findOneBy({ name: dto.name });

    if (isExistedName) {
      throw new ConflictException('Phân loại đã tồn tại.');
    }

    const category = this.categoryRepo.create({
      name: dto.name,
      status: dto.status,
    });

    const categoryEntity = await this.categoryRepo.save(category);

    return new CategoryDto(categoryEntity);
  }

  async update(id: string, dto: CategoryInputDto) {
    const category = await this.categoryRepo.findOneBy({ id });

    if (!category) {
      throw new NotFoundException();
    }

    await this.categoryRepo.update(
      { id },
      {
        name: dto.name,
        status: dto.status,
      },
    );

    category.name = dto.name;
    return new CategoryDto(category);
  }

  async delete(id: string) {
    const category = await this.categoryRepo.findOneBy({ id });

    if (!category) {
      throw new NotFoundException();
    }

    await this.categoryRepo.softDelete({ id });

    return new CategoryDto(category);
  }
}
