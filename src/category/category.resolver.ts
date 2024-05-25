import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import {
  CategoryPageDto,
  CategoryPageOptionsDto,
} from './dto/category-page.dto';
import { CategoryDto, CategoryInputDto } from './dto/category.dto';

@Resolver('Category')
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query((returns) => CategoryPageDto)
  async categories(
    // @Args('options') options: CategoryPageOptionsDto,
    @Args() options: CategoryPageOptionsDto,
  ): Promise<CategoryPageDto> {
    return await this.categoryService.getAll(options);
  }

  @Query((returns) => CategoryDto)
  async category(@Args('id') id: string): Promise<CategoryDto> {
    return await this.categoryService.getOne(id);
  }

  @Mutation((returns) => CategoryDto)
  async createCategory(
    @Args('data') data: CategoryInputDto,
  ): Promise<CategoryDto> {
    return await this.categoryService.create(data);
  }

  @Mutation((returns) => CategoryDto)
  async updateCategory(
    @Args('id') id: string,
    @Args('data') data: CategoryInputDto,
  ): Promise<CategoryDto> {
    return await this.categoryService.update(id, data);
  }

  @Mutation((returns) => CategoryDto)
  async deleteCategory(@Args('id') id: string): Promise<CategoryDto> {
    return await this.categoryService.delete(id);
  }
}
