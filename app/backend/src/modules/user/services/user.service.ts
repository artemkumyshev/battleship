import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

import { UserEntity } from '@/user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async createUser(user: { email: string; password: string }) {
    const newUser = await this.repository.create(user);
    return await this.repository.save(newUser);
  }

  async signOut(id: string) {
    const user = await this.findUserById(id);
    user.currentHashedRefreshToken = null;
    await this.repository.save(user);

    return;
  }

  async findUserById(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async findUserByEmail(email: string) {
    try {
      return await this.repository.findOneBy({ email });
    } catch {
      return undefined;
    }
  }

  async findAll(options: IPaginationOptions) {
    return paginate<UserEntity>(this.repository, options);
  }

  async setCurrentRefreshToken(refreshToken: string, id: string) {
    const currentHashedRefreshToken = await hash(refreshToken, 10);
    await this.repository.update(id, { currentHashedRefreshToken });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, id: string) {
    const user = await this.findUserById(id);

    const isRefreshTokenMatching = await compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(id: string) {
    return this.repository.update(id, {
      currentHashedRefreshToken: null,
    });
  }
}
