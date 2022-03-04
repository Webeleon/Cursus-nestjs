import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  list(
    page: number = 0, pageSize: number = 10,
  ): Promise<User[]> {
    return this.userRepository.find({
      skip: page * pageSize,
      take: pageSize
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user;
  }
}
