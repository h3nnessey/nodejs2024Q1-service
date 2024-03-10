import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({
    type: 'string',
    description: 'Track name',
    example: 'Courtesy Call',
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '7d0a94e4-5703-4c99-b959-3688805d8610',
    description: 'Artist ID',
    nullable: true,
    required: true,
  })
  @IsDefined()
  @IsOptional()
  @IsUUID('4')
  artistId: string | null;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '4d8ee4c0-34f0-42e8-a1f7-c992163956fa',
    description: 'Album ID',
    nullable: true,
    required: true,
  })
  @IsDefined()
  @IsOptional()
  @IsUUID('4')
  albumId: string | null;

  @ApiProperty({
    type: 'integer',
    example: 240,
    description: 'Track duration in seconds',
    required: true,
  })
  @IsDefined()
  @IsInt()
  @IsPositive()
  duration: number;
}
