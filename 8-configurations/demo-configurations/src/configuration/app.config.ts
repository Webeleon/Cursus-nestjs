import { ConfigType, registerAs } from '@nestjs/config';
import * as process from 'process';

export const appConfig = registerAs('app', () => {
  return {
    env: process.env.NODE_ENV ?? 'dev',
    port: !Number.isNaN(process.env.PORT) ? parseInt(process.env.PORT) : 3000,
  };
});

export type AppConfig = ConfigType<typeof appConfig>;
