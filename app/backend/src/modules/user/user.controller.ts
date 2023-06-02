import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Operation } from '@/decorators/index';

import { JwtAuthGuard } from '@/auth/guards';
import { UserService } from '@/user/services/user.service';

@ApiTags('Пользователи')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Operation('Все пользователи')
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    limit = limit > 100 ? 100 : limit;
    return this.userService.findAll({
      page,
      limit,
      route: '/api/v1/users',
    });
  }
}
