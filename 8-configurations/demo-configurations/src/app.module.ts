import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './configuration/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    ConfigModule.forFeature(appConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
