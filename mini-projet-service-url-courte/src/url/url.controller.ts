import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { Url } from './url.entity';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createUrlDto: CreateUrlDto
  ): Promise<Url> {
    return this.urlService.create(createUrlDto);
  }
}
