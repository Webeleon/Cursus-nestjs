import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';

@Controller('book')
export class BookController {
  books: string[] = [
    'Apprendre NestJS, c\'est facile',
  ];

  @Get()
  list() {
    return this.books;
  }

  @Get('/:index')
  getBookByIndex(
    @Param('index') index: string,
  ) {
    if (!this.books[index]) {
      throw new NotFoundException(`Book with index ${index} does not exist!`);
    }
    return this.books[index];
  }

  @Post()
  addBook(
    @Body('title') book: string
  ) {
    this.books.push(book)
    return book
  }

  @Put('/:index')
  updateBook(
    @Param('index') index: string,
    @Body('title') book: string,
  ) {
    if (!this.books[index]) {
      throw new NotFoundException(`Book with index ${index} does not exist!`)
    }
    this.books[index] = book;
    return book;
  }

  @Delete('/:index')
  deleteBook(
    @Param('index') index: string
  ) {
    if (!this.books[index]) {
      throw new NotFoundException(`Book with index ${index} does not exist!`)
    }

    delete this.books[index];

    return 'deleted';
  }
}
