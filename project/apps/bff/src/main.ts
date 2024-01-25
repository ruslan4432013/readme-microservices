/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

import { RequestIdInterceptor } from './app/interceptors/request-id.interceptor';

const GLOBAL_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_PREFIX);
  const config = app.get(ConfigService);
  app.useGlobalInterceptors(new RequestIdInterceptor());
  const port = config.get<string>('application.port')!;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
