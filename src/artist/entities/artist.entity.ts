import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateArtistDto } from '../dto';

export class Artist extends OmitType(CreateArtistDto, [] as const) {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '5cdb3910-b777-4ce3-9eea-a9b62584541a',
    description: 'Artist ID',
  })
  id: string;
}
