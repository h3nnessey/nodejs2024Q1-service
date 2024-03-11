import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateAlbumDto } from '../dto';

export class Album extends OmitType(CreateAlbumDto, [] as const) {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '316ceb21-4a71-4371-abf9-5f35c8cfef9c',
    description: 'Album id',
  })
  id: string;
}
