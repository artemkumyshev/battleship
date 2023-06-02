import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import {
  BadRequestResponse,
  ErrorResponses,
  OkResponse,
  Operation,
  UnauthorizedResponse,
} from '@/decorators/index';
import { GenericResponse } from '@/dto/generic-response.dto';

import { UserEntity } from '@/user/entities/user.entity';
import { UserService } from '@/user/services/user.service';
import { GetUser } from '@/auth/decorator/get-user.decorator';
import { JwtAuthGuard, JwtRefreshGuard, LocalAuthGuard } from '@/auth/guards';
import { SignInDto } from '@/auth/dto/sign-in.dto';
import { SignUpDto } from '@/auth/dto/sign-up.dto';
import { AuthService } from '@/auth/services/auth.service';

@ApiTags('Авторизация и регистрация пользователя')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Operation('Регистрация')
  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    const user = await this.authService.signUp(dto);
    return new GenericResponse('Вы успешно прошли регистрацию', { user });
  }

  // @Operation('Авторизация')
  // @OkResponse(UserEntity)
  // @ErrorResponses(UnauthorizedResponse, BadRequestResponse)
  // @UseGuards(LocalAuthGuard)
  // @Post('sign-in')
  // async signIn(
  //   @Body() signInAuthDto: SignInDto,
  //   @Res({ passthrough: true }) response: Response,
  // ) {
  //   const user = await this.authService.signIn(signInAuthDto);

  //   const { accessToken, ...accessOption } =
  //     this.authService.getCookieWithJwtAccessToken(user.id);
  //   const { refreshToken, ...refreshOption } =
  //     this.authService.getCookieWithJwtRefreshToken(user.id);

  //   await this.userService.setCurrentRefreshToken(refreshToken, user.id);

  //   response.cookie('Authentication', accessToken, accessOption);
  //   response.cookie('Refresh', refreshToken, refreshOption);

  //   return new GenericResponse('Вы успешно авторизовались', {
  //     user,
  //   });
  // }

  @Operation('Авторизация')
  @OkResponse(UserEntity)
  @ErrorResponses(UnauthorizedResponse, BadRequestResponse)
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Body() signInAuthDto: SignInDto) {
    const user = await this.authService.signIn(signInAuthDto);

    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateRefreshToken(user.id);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    return new GenericResponse('Вы успешно авторизовались', {
      user,
      accessToken,
      refreshToken,
    });
  }

  @Operation('Выход из системы')
  @OkResponse(UserEntity)
  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  async signOut(
    @Res({ passthrough: true }) response: Response,
    @GetUser() { id }: Pick<UserEntity, 'id'>,
  ) {
    await this.authService.signOut(id);
    response.clearCookie('Authentication');
    response.clearCookie('Refresh');
    return new GenericResponse('Успешный выход из системы');
  }

  @Operation('Обновить токен')
  @OkResponse()
  @ApiCookieAuth()
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(
    @Req() request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user } = request;
    const { accessToken, ...accessOption } =
      this.authService.getCookieWithJwtAccessToken(user.id);
    response.cookie('Authentication', accessToken, accessOption);

    return new GenericResponse('Вы успешно авторизовались', {
      user,
    });
  }

  @Operation('Получить профиль текущего пользователя')
  @OkResponse(UserEntity)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(
    @GetUser() { id }: Pick<UserEntity, 'id'>,
  ): Promise<GenericResponse<UserEntity>> {
    const user = await this.authService.getProfile(id);
    return new GenericResponse('Профиль успешно найден', user);
  }
}
