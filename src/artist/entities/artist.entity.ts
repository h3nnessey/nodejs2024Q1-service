import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateArtistDto } from '../dto';

// relations: tracks, albums, favs
// const tracks = (await this.db.tracks.findMany()).filter(
//   (track) => track.artistId === id,
// );
// const albums = (await this.db.albums.findMany()).filter(
//   (album) => album.artistId === id,
// );

// tracks.forEach(async (track) => {
//   await this.db.tracks.update(track.id, { artistId: null });
// });

// albums.forEach(async (album) => {
//   await this.db.albums.update(album.id, { artistId: null });
// });

// await this.db.favorites.artists.delete(id);
// await this.db.artists.delete(id);
@Entity()
export class Artist implements CreateArtistDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '5cdb3910-b777-4ce3-9eea-a9b62584541a',
    description: 'Artist ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'Freddie Mercury',
    description: 'Artist name',
  })
  @Column()
  name: string;

  @ApiProperty({
    type: 'boolean',
    example: false,
    description: 'Has Grammy award',
  })
  @Column()
  grammy: boolean;
}
