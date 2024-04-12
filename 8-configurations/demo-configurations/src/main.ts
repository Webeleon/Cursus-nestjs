import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig, appConfig } from './configuration/app.config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<AppConfig>(appConfig.KEY);

  await app.listen(config.port, () => {
    Logger.log(`API started on port ${config.port}`, 'MAIN');
  });
}
bootstrap();
