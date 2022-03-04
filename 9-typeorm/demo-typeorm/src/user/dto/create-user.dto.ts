import { IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  name: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
