import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';
import {
  IPageDataDto,
  IPageOptionsDto,
  PageParameterDto,
} from 'src/base/page-data.dto';
import { ActiveStatus } from 'src/enums/active.enum';
import { CategoryEntity } from '../category.entity';
import { CategoryDto } from './category.dto';

@ObjectType()
export class CategoryPageDto extends IPageDataDto {
  @Field(() => [CategoryDto])
  items: CategoryDto[];

  constructor(data: CategoryEntity[], meta: PageParameterDto) {
    super(meta);
    this.items = data.map((x) => new CategoryDto(x));
  }
}

@ArgsType()
//@InputType()
export class CategoryPageOptionsDto extends IPageOptionsDto {
  @Field((type) => ActiveStatus, {
    nullable: true,
  })
  @IsOptional()
  @IsEnum(ActiveStatus)
  status: ActiveStatus;
}
