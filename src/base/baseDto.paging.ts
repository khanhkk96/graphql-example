import { Field, ID, ObjectType } from '@nestjs/graphql';

// @InterfaceType()
@ObjectType()
export abstract class BaseDto {
  @Field((type) => ID)
  id: String;

  @Field((type) => Date)
  created: Date;

  @Field((type) => Date)
  updated: Date;

  constructor(entity: any) {
    const { id, created, update } = entity;

    this.id = id;
    this.created = created;
    this.updated = update;
  }
}
