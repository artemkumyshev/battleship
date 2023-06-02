import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from '@/auth/services';
import {
  JwtStrategy,
  JwtRefreshStrategy,
  LocalStrategy,
} from '@/auth/strategies';
import { AuthController } from '@/auth/auth.controller';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: '10s',
          // expiresIn: configService.get<string>(
          //   'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          // ),
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    LocalStrategy,
    ConfigService,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
