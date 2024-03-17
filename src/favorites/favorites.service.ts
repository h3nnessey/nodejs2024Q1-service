import { Injectable } from '@nestjs/common';
import { FavoritesTrackService } from './track/favorites-track.service';
import { FavoritesAlbumService } from './album/favorites-album.service';
import { FavoritesArtistService } from './artist/favorites-artist.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesTrackService: FavoritesTrackService,
    private readonly favoritesAlbumService: FavoritesAlbumService,
    private readonly favoritesArtistService: FavoritesArtistService,
  ) {}

  async findMany() {
    return {
      tracks: await this.favoritesTrackService.findMany(),
      albums: await this.favoritesAlbumService.findMany(),
      artists: await this.favoritesArtistService.findMany(),
    };
  }
}
