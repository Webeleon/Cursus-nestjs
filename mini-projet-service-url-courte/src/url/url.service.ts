import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './url.entity';
import { Repository } from 'typeorm';
import { CreateUrlDto } from './dto/create-url.dto';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url) private readonly urlRepository: Repository<Url>,
  ) {}

  async create(createUrlDto: CreateUrlDto): Promise<Url> {
    const url = this.urlRepository.create(createUrlDto);
    await this.urlRepository.save(url);
    return url;
  }
}
