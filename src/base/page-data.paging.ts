import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

export class PageParameterDto {
  total: number;

  take: number;

  page: number;
}

@ObjectType()
export class IPageDataDto {
  @Field((type) => Int)
  total: number;

  @Field((type) => Int)
  pages: number;

  @Field((type) => Int)
  take: number;

  @Field((type) => Int)
  page: number;

  @Field((type) => Boolean)
  hasNextPage: boolean;

  @Field((type) => Boolean)
  hasPreviousPage: boolean;

  constructor(meta: PageParameterDto) {
    const { total, page, take } = meta;
    this.total = total;
    this.page = page;
    this.take = take;
    this.pages = Math.ceil(total / take);
    this.hasPreviousPage = page > 1;
    this.hasNextPage = page < this.pages;
  }
}

@ArgsType()
// @InputType()
export class IPageOptionsDto {
  @Field((type) => Int, { defaultValue: 1 })
  @IsOptional()
  @IsInt()
  page: number = 1;

  @Field((type) => Int, { defaultValue: 10 })
  @IsOptional()
  @IsInt()
  take: number = 10;

  @Field((type) => String, { nullable: true, defaultValue: '' })
  @IsOptional()
  q: string;

  get skip() {
    return (this.page - 1) * this.take;
  }
}
