import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from './app.config';
import mongoConfig from './mongo.config';
import jwtConfig from './jwt/jwt.config';

const ENV_USERS_FILE_PATH = 'apps/account/account.env';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, mongoConfig, jwtConfig],
      envFilePath: ENV_USERS_FILE_PATH,
    }),
  ],
})
export class ConfigAccountModule {}
