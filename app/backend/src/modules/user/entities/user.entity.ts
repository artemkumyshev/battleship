import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

import { BaseEntity } from '@/entities/base.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ description: 'Логин' })
  @Column({ type: 'varchar', unique: true, nullable: true })
  login: string;

  @ApiProperty({ description: 'Электронная почта' })
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'text' })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  currentHashedRefreshToken: string;
}
