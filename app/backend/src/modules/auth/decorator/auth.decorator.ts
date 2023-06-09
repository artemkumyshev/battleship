import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

export function Auth() {
  return applyDecorators(ApiCookieAuth(), UseGuards(JwtAuthGuard));
}
