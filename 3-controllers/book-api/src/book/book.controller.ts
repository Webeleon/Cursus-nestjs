import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('book')
export class BookController {
  books: string[] = ['le secret de ji'];

  @Get()
  list() {
    return this.books;
  }

  @Get('/:index')
  getByIndex(@Param('index') index: string): string {
    const book = this.books[index];
    if (!book) {
      throw new NotFoundException();
    }
    return book;
  }

  @Post()
  addBook(@Body('title') book: string) {
    this.books.push(book);
    return book;
  }

  @Put('/:index')
  updateBook(@Param('index') index: string, @Body('title') book: string) {
    if (!this.books[index]) {
      throw new NotFoundException();
    }
    this.books[index] = book;
    return book;
  }

  @Delete('/:index')
  deleteBook(@Param('index') index: string) {
    if (!this.books[index]) {
      throw new NotFoundException();
    }
    delete this.books[index];
  }
}
