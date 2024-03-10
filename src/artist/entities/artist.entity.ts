import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateArtistDto } from '../dto';

export class Artist extends OmitType(CreateArtistDto, [] as const) {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: 'f0f9b1b7-8b2b-4b6b-8b1b-8b2b8b1b7b2b',
    description: 'Track ID',
  })
  id: string;
}
