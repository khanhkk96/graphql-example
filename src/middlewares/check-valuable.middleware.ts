import { BadRequestException } from '@nestjs/common';
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

const hasValuableMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const propName = ctx.info;
  const value = await next();

  if (value === null || value === undefined) {
    throw new BadRequestException(`${propName.fieldName} is required`);
  }
  return value;
};

export default hasValuableMiddleware;
