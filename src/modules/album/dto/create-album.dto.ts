import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsOptional,
  IsString,
  IsUUID,
  IsNotEmpty,
  IsInt,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Artist id',
    example: '02bded4c-fe9a-41c2-807e-71d991c0c5db',
    nullable: true,
    required: true,
  })
  @IsDefined()
  @IsOptional()
  @IsUUID('4')
  artistId: string | null;

  @ApiProperty({
    type: 'string',
    description: 'Album name',
    example: 'Queen',
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'integer',
    description: 'Year of release',
    example: 1978,
    required: true,
  })
  @IsDefined()
  @IsInt()
  @IsNotEmpty()
  year: number;
}
