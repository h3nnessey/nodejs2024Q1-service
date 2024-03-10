import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateTrackDto } from './create-track.dto';
import { IsDefined, IsInt, IsPositive } from 'class-validator';

export class UpdateTrackDto extends OmitType(CreateTrackDto, [] as const) {
  @ApiProperty({
    type: 'integer',
    example: 155,
    description: 'Track duration in seconds',
    required: true,
  })
  @IsDefined()
  @IsInt()
  @IsPositive()
  duration: number;
}
