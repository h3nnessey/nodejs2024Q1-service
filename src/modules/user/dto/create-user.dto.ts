import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'cat_lover',
    description: 'User login',
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: '12345',
    description: 'User password',
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  password: string;
}
