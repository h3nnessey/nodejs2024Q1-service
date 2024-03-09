import { Injectable } from '@nestjs/common';
import { User } from '@/user/entities/user.entity';
import { Track } from '@/track/entities/track.entity';
import { Artist } from '@/artist/entities/artist.entity';
import { Album } from '@/album/entities/album.entity';
import { FavoritesResponse } from '@/favorites/interfaces/favorites-response.interface';
import { EntityDatabase } from './lib/entity.db';
import { PrimitiveDatabase } from './lib/primitive.db';

@Injectable()
export class DatabaseService {
  public readonly users = new EntityDatabase<User>();
  public readonly tracks = new EntityDatabase<Track>();
  public readonly artists = new EntityDatabase<Artist>();
  public readonly albums = new EntityDatabase<Album>();

  public readonly favorites = {
    tracks: new PrimitiveDatabase<string>(),
    artists: new PrimitiveDatabase<string>(),
    albums: new PrimitiveDatabase<string>(),
    findMany: async (): Promise<FavoritesResponse> => {
      return {
        tracks: await Promise.all(
          (await this.favorites.tracks.findMany()).map((id) =>
            this.tracks.findOne(id),
          ),
        ),
        artists: await Promise.all(
          (await this.favorites.artists.findMany()).map((id) =>
            this.artists.findOne(id),
          ),
        ),
        albums: await Promise.all(
          (await this.favorites.albums.findMany()).map((id) =>
            this.albums.findOne(id),
          ),
        ),
      };
    },
  };
}
