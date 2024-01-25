import { HttpModuleAsyncOptions } from '@nestjs/axios/dist/interfaces/http-module.interface';
import { ConfigService } from '@nestjs/config';

export const getHttpModuleOptions = (): HttpModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    timeout: config.get('application.httpClientTimeout'),
    maxRedirects: config.get('application.httpClientMaxRedirects')
  })
});
