import { Album } from '@/album/entities/album.entity';
import { Artist } from '@/artist/entities/artist.entity';
import { Track } from '@/track/entities/track.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Favorites {
  @ApiProperty({
    type: [Artist],
    description: 'Artist list',
    required: true,
  })
  artists: Artist[];

  @ApiProperty({
    type: [Album],
    description: 'Album list',
    required: true,
  })
  albums: Album[];

  @ApiProperty({
    type: [Track],
    description: 'Track list',
    required: true,
  })
  tracks: Track[];
}
