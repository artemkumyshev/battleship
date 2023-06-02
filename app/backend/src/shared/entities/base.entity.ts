import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @ApiProperty({ description: 'ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Дата создания' })
  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  createdAt: Date;

  @ApiProperty({ description: 'Дата обновления' })
  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  updatedAt: Date;
}
