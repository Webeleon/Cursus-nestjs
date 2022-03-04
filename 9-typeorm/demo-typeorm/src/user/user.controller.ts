import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  list(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ): Promise<User[]> {
    return this.userService.list(page, pageSize)
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Body() createUserDto: CreateUserDto
  ): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
