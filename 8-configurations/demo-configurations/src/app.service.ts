import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { appConfig } from './configuration/app.config';

@Injectable()
export class AppService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>,
  ) {}
  getEnv(): string {
    return this.config.env;
  }
}
