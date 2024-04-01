import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    type: 'string',
    example: 'Freddie Mercury',
    description: 'Artist name',
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'boolean',
    example: false,
    description: 'Has Grammy award',
    required: true,
  })
  @IsDefined()
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
