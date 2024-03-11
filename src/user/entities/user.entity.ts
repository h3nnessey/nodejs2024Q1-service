import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class User {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: 'f0f9b1b7-8b2b-4b6b-8b1b-8b2b8b1b7b2b',
    description: 'User ID',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'cat_lover',
    description: 'User login',
  })
  login: string;

  @ApiHideProperty()
  @Exclude()
  password: string;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'User version',
  })
  version: number;

  @ApiProperty({
    type: 'number',
    example: 1710084738234,
    description: 'User creation time',
  })
  createdAt: number;

  @ApiProperty({
    type: 'number',
    example: 1710084738234,
    description: 'User update time',
  })
  updatedAt: number;
}
