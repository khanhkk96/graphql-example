import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import {
  IPageDataDto,
  IPageOptionsDto,
  PageParameterDto,
} from 'src/base/page-data.dto';
import { ItemEntity } from '../item.entity';
import { ItemDto } from './item.dto';

@ObjectType()
export class ItemPageDto extends IPageDataDto {
  @Field(() => [ItemDto])
  items: ItemDto[];

  constructor(data: ItemEntity[], meta: PageParameterDto) {
    super(meta);
    this.items = data.map((x) => new ItemDto(x));
  }
}

@ArgsType()
//@InputType()
export class ItemPageOptionsDto extends IPageOptionsDto {}
