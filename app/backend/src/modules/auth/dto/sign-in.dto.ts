import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty({ description: 'Электронная почта' })
  @IsNotEmpty({ message: 'Поле "Email" обязательно' })
  @IsEmail({}, { message: 'Поле "Email" должно быть электронным адресом' })
  email: string;

  @ApiProperty({ description: 'Пароль' })
  @IsNotEmpty({ message: 'Поле "Пароль" обязательно' })
  password: string;
}
