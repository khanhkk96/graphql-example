import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { registerEnumType } from '@nestjs/graphql';
import { AppModule } from './app.module';
import { ActiveStatus } from './enums/active.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      dismissDefaultMessages: true,
      validationError: {
        target: false,
      },
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );
  registerEnumType(ActiveStatus, {
    name: 'ActiveStatus',
  });
  await app.listen(3000);
}
bootstrap();
