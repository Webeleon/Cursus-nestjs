import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';

@Module({
  imports: [],
  controllers: [AppController, BookController],
  providers: [AppService],
})
export class AppModule {}
