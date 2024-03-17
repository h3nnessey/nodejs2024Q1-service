import { ApiProperty } from '@nestjs/swagger';
import { Album } from '@/album/entities/album.entity';
import { Artist } from '@/artist/entities/artist.entity';
import { Track } from '@/track/entities/track.entity';

export class Favorites {
  @ApiProperty({
    type: [Artist],
    description: 'Artist list',
  })
  artists: Artist[];

  @ApiProperty({
    type: [Album],
    description: 'Album list',
  })
  albums: Album[];

  @ApiProperty({
    type: [Track],
    description: 'Track list',
  })
  tracks: Track[];
}
