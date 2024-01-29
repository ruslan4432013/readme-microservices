/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

const GLOBAL_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_PREFIX);
  const config = app.get(ConfigService);

  const swagger = new DocumentBuilder()
    .setTitle('The «Notify» service')
    .setDescription('Notify service API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('spec', app, document);
  
  const port = config.get<string>('application.port')!;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
