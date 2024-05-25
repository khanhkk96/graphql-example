import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { BaseDto } from 'src/base/baseDto.dto';
import { CategoryDto } from 'src/category/dto/category.dto';
import { ItemEntity } from '../item.entity';

@ObjectType()
export class ItemDto extends BaseDto {
  @Field((type) => String)
  name: string;

  @Field((type) => CategoryDto, { nullable: true })
  category: CategoryDto;

  constructor(item: ItemEntity) {
    super(item);

    this.name = item.name;

    if (item.category) {
      this.category = new CategoryDto(item.category);
    }
  }
}

@InputType()
export class ItemInputDto {
  @Field((type) => String)
  @IsNotEmpty()
  name: string;

  @Field((type) => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  categoryId: string;
}
