import { createUnionType } from '@nestjs/graphql';
import { CategoryDto } from 'src/category/dto/category.dto';
import { ItemDto } from 'src/item/dto/item.dto';

export const LookupItemUnion = createUnionType({
  name: 'LookupItemUnion',
  types: () => [ItemDto, CategoryDto] as const,
});
