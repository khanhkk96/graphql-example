import { Directive, Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/base/baseDto.paging';
import { ActiveStatus } from 'src/enums/active.enum';
import { CategoryEntity } from '../category.entity';

@ObjectType()
export class CategoryDto extends BaseDto {
  @Field((type) => String)
  @Directive('@upper')
  name: string;

  @Field((type) => ActiveStatus)
  status: ActiveStatus;

  constructor(category: CategoryEntity) {
    super(category);

    this.name = category.name;
    this.status = category.status;
  }
}

@InputType()
export class CategoryInputDto {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field((type) => ActiveStatus, {
    nullable: true,
    defaultValue: ActiveStatus.ACTIVE,
  })
  status: ActiveStatus;
}
