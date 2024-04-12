import { ConfigType, registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const schema = Joi.object({
  env: Joi.string().valid(...['dev', 'staging', 'production', 'test']),
  port: Joi.number().port(),
});

export const appConfig = registerAs('app', () => {
  const config = {
    env: process.env.NODE_ENV ?? 'dev',
    port: !Number.isNaN(process.env.PORT) ? parseInt(process.env.PORT) : 3000,
  };

  const validation = schema.validate(config, {
    abortEarly: false,
  });

  if (validation.error) {
    throw new Error(`invalid config: ${validation.error.message}`);
  }

  return config;
});

export type AppConfig = ConfigType<typeof appConfig>;
