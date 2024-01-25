import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import * as process from 'process';

const DEFAULT_PORT = 3000;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;
const DEFAULT_HTTP_CLIENT_MAX_REDIRECTS = 5;
const DEFAULT_HTTP_CLIENT_TIMEOUT = 5000;

type Environment = typeof ENVIRONMENTS[number];

export interface ApplicationConfig {
  environment: string;
  port: number;
  httpClientMaxRedirects: number,
  httpClientTimeout: number
  url: {
    account: string
    publications: string
  }
}

const validationSchema = Joi.object<ApplicationConfig, true>({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(DEFAULT_PORT),
  httpClientMaxRedirects: Joi.number(),
  httpClientTimeout: Joi.number(),
  url: Joi.object<ApplicationConfig['url'], true>({
    account: Joi.string().required(),
    publications: Joi.string().required()
  })
});

function validateConfig(config: ApplicationConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Application Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): ApplicationConfig {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
    httpClientMaxRedirects: parseInt(process.env.HTTP_CLIENT_MAX_REDIRECTS || `${DEFAULT_HTTP_CLIENT_MAX_REDIRECTS}`, 10),
    httpClientTimeout: parseInt(process.env.HTTP_CLIENT_TIMEOUT || `${DEFAULT_HTTP_CLIENT_TIMEOUT}`, 10),
    url: {
      account: process.env.ACCOUNT_URL!,
      publications: process.env.PUBLICATIONS_URL!
    }
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
