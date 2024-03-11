import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../entities';

export class UpdatedUserDto extends PickType(User, [
  'id',
  'createdAt',
  'login',
  'password',
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
