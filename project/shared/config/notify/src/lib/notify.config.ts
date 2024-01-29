import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

import * as process from 'process';

const DEFAULT_PORT = 3002;
const DEFAULT_MONGO_PORT = 27017;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;
const DEFAULT_RABBIT_PORT = 5672;
const DEFAULT_SMTP_PORT = 25;
const DEFAULT_HTTP_CLIENT_MAX_REDIRECTS = 5;
const DEFAULT_HTTP_CLIENT_TIMEOUT = 5000;


type Environment = typeof ENVIRONMENTS[number];

export interface NotifyConfig {
  httpClientMaxRedirects: number,
  httpClientTimeout: number
  environment: string;
  port: number;
  uploadDirectory: string;
  db: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
    authBase: string;
  },
  rabbit: {
    host: string;
    password: string;
    user: string;
    queue: string;
    exchange: string;
    port: number;
  },
  mail: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
  },
  url: {
    publications: string
  }
}

const validationSchema = Joi.object<NotifyConfig, true>({
  httpClientMaxRedirects: Joi.number(),
  httpClientTimeout: Joi.number(),
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(DEFAULT_PORT),
  uploadDirectory: Joi.string().required(),
  db: Joi.object({
    host: Joi.string().valid().hostname(),
    port: Joi.number().port(),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required()
  }),
  rabbit: Joi.object({
    host: Joi.string().valid().hostname().required(),
    password: Joi.string().required(),
    port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
    user: Joi.string().required(),
    queue: Joi.string().required(),
    exchange: Joi.string().required()
  }),
  mail: Joi.object({
    host: Joi.string().valid().hostname().required(),
    port: Joi.number().port().default(DEFAULT_SMTP_PORT),
    user: Joi.string().required(),
    password: Joi.string().required(),
    from: Joi.string().required()
  }),
  url: Joi.object({
    publications: Joi.string().required()
  })
});

function validateConfig(config: NotifyConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Notify Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): NotifyConfig {
  const config: NotifyConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
    httpClientMaxRedirects: parseInt(process.env.HTTP_CLIENT_MAX_REDIRECTS || `${DEFAULT_HTTP_CLIENT_MAX_REDIRECTS}`, 10),
    httpClientTimeout: parseInt(process.env.HTTP_CLIENT_TIMEOUT || `${DEFAULT_HTTP_CLIENT_TIMEOUT}`, 10),
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH!,
    db: {
      host: process.env.MONGO_HOST!,
      port: parseInt(process.env.MONGO_PORT ?? DEFAULT_MONGO_PORT.toString(), 10),
      name: process.env.MONGO_DB!,
      user: process.env.MONGO_USER!,
      password: process.env.MONGO_PASSWORD!,
      authBase: process.env.MONGO_AUTH_BASE!
    },
    rabbit: {
      host: process.env.RABBIT_HOST!,
      password: process.env.RABBIT_PASSWORD!,
      port: parseInt(process.env.RABBIT_PORT ?? DEFAULT_RABBIT_PORT.toString(), 10),
      user: process.env.RABBIT_USER!,
      queue: process.env.RABBIT_QUEUE!,
      exchange: process.env.RABBIT_EXCHANGE!
    },
    mail: {
      host: process.env.MAIL_SMTP_HOST!,
      port: parseInt(process.env.MAIL_SMTP_PORT ?? DEFAULT_SMTP_PORT.toString(), 10),
      user: process.env.MAIL_USER_NAME!,
      password: process.env.MAIL_USER_PASSWORD!,
      from: process.env.MAIL_FROM!
    },
    url: {
      publications: process.env.PUBLICATIONS_URL!
    }
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
