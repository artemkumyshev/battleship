import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
