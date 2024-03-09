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
      return {
        tracks: await Promise.all(
          (await this.favorites.tracks.findMany()).map(({ id }) =>
            this.tracks.findOne(id),
          ),
        ),
        artists: await Promise.all(
          (await this.favorites.artists.findMany()).map(({ id }) =>
            this.artists.findOne(id),
          ),
        ),
        albums: await Promise.all(
          (await this.favorites.albums.findMany()).map(({ id }) =>
            this.albums.findOne(id),
          ),
        ),
      };
    },
  };
}
