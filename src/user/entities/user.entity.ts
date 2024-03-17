import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateUserDto } from '../dto';

@Entity()
export class User implements CreateUserDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: 'f0f9b1b7-8b2b-4b6b-8b1b-8b2b8b1b7b2b',
    description: 'User ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'cat_lover',
    description: 'User login',
  })
  @Column()
  login: string;

  @ApiHideProperty()
  @Exclude()
  @Column()
  password: string;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'User version',
  })
  @VersionColumn()
  version: number;

  @ApiProperty({
    type: 'number',
    example: 1710084738234,
    description: 'User creation time',
  })
  @Transform(({ value }) => new Date(value).getTime())
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    type: 'number',
    example: 1710084738234,
    description: 'User update time',
  })
  @Transform(({ value }) => new Date(value).getTime())
  @UpdateDateColumn()
  updatedAt: Date;
}
