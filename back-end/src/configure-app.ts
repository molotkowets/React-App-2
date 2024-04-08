import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import type { NestExpressApplication } from '@nestjs/platform-express';

export const configureApp = (app: NestExpressApplication) => {
  app.useLogger(app.get(Logger));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
};
