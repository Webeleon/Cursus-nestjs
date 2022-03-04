import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './url/url.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'mini_projet_url_courte',
      entities: [Url],
      synchronize: true,
    }),
    UrlModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
