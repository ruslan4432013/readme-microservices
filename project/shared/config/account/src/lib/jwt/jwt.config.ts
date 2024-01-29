import { ConfigType, registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';

import { JwtConfiguration } from './jwt.env';


async function getJwtConfig(): Promise<JwtConfiguration> {
  const config = plainToClass(JwtConfiguration, {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
  });

  await config.validate();
  return config;
}

export default registerAs(
  'jwt',
  async (): Promise<ConfigType<typeof getJwtConfig>> => {
    return getJwtConfig();
  }
);
