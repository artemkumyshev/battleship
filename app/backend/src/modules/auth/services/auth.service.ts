import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compare, genSaltSync, hashSync } from 'bcrypt';

import { UserService } from '@/user/services/user.service';
import { SignUpDto } from '@/auth/dto/sign-up.dto';
import { SignInDto } from '@/auth/dto/sign-in.dto';
import {
  ALREADY_REGISTERED_ERROR,
  USER_DATA_INCORRET,
} from '@/auth/auth.constants';
import { UserEntity } from '@/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(dto: SignUpDto) {
    const user = await this.userService.findUserByEmail(dto.email);

    if (user) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    const salt = await genSaltSync(10);
    const hashPassword = await hashSync(dto.password, salt);

    return await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });
  }

  async signIn(dto: SignInDto) {
    const user = await this.userService.findUserByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException(USER_DATA_INCORRET);
    }

    const isCorrectPassword = await compare(dto.password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(USER_DATA_INCORRET);
    }

    return user;
  }

  async signOut(id: string) {
    return await this.userService.signOut(id);
  }

  async getProfile(id: string) {
    return await this.userService.findUserById(id);
  }

  async vaildateUser(email: string, plainTextPassword: string): Promise<any> {
    try {
      const user = await this.userService.findUserByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw new HttpException(
        'Неправильно указаны учетные данные',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async generateAccessToken(user: UserEntity) {
    return this.jwtService.sign(
      { payload: { user } },
      {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: `30s`,
      },
    );
  }

  async generateRefreshToken(id: string) {
    return this.jwtService.sign(
      { payload: { id } },
      {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: `30d`,
      },
    );
  }

  getCookieWithJwtAccessToken(id: string) {
    const payload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    return {
      accessToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge:
        Number(this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')) *
        1000,
    };
  }

  getCookieWithJwtRefreshToken(id: string) {
    const payload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    return {
      refreshToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge:
        Number(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')) *
        1000,
    };
  }

  getCookiesForLogOut() {
    return {
      accessOption: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 0,
      },
      refreshOption: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 0,
      },
    };
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatch = await compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatch) {
      throw new HttpException(
        'Неправильно указаны учетные данные',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
