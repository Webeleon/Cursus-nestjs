import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiKeyAuthService } from './api-key-auth/api-key-auth.service';
import { ApiKeyAuthMiddleware } from './api-key-auth/api-key-auth.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ApiKeyAuthService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyAuthMiddleware);
  }
}
