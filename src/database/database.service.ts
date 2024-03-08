import { Injectable } from '@nestjs/common';
import { User } from '@/user/entities/user.entity';
import { Track } from '@/track/entities/track.entity';
import { Artist } from '@/artist/entities/artist.entity';
import { Album } from '@/album/entities/album.entity';
import { Database } from './database';

@Injectable()
export class DatabaseService {
  public readonly users = new Database<User>();
  public readonly tracks = new Database<Track>();
  public readonly artists = new Database<Artist>();
  public readonly albums = new Database<Album>();

  public readonly favorites = {
    tracks: new Database(),
    artists: new Database(),
    albums: new Database(),
    findMany: async () => {
      const [tracksIds, artistsIds, albumsIds] = await Promise.all([
        this.favorites.tracks.findMany(),
        this.favorites.artists.findMany(),
        this.favorites.albums.findMany(),
      ]);

      return {
        tracks: await Promise.all(
          tracksIds.map(async ({ id }) => await this.tracks.findOne(id)),
        ),
        artists: await Promise.all(
          artistsIds.map(async ({ id }) => await this.artists.findOne(id)),
        ),
        albums: await Promise.all(
          albumsIds.map(async ({ id }) => await this.albums.findOne(id)),
        ),
      };
    },
  };
}
