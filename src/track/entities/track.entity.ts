import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateTrackDto } from '../dto';

export class Track extends OmitType(CreateTrackDto, [] as const) {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: 'aed621bd-fdb6-41ce-b092-d9861a2a2330',
    description: 'Track id',
  })
  id: string;
}
