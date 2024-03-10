import { ApiProperty, PickType } from '@nestjs/swagger';
import { User as UserEntity } from './user.entity';

export class User extends PickType(UserEntity, [
  'id',
  'login',
  'password',
  'createdAt',
] as const) {
  @ApiProperty({
    type: 'number',
    example: 2,
    description: 'User version',
  })
  version: number;

  @ApiProperty({
    type: 'number',
    example: 1710094738234,
    description: 'User update time',
  })
  updatedAt: number;
}
