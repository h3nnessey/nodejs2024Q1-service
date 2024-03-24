import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: '12345',
    description: 'User old password',
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    example: '123456789',
    description: 'User new password',
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
