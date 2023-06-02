import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// import dbConfiguration from '@/configs/db.config';
import typeOrmConfig from '@/configs/typeorm.config';
import { RequestInterceptor } from '@/interceptors/request.interceptor';

import { UserModule } from '@/user/user.module';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: RequestInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
