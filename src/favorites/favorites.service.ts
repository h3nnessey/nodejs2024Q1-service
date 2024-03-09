import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { FavoritesResponse } from './interfaces/favorites-response.interface';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: DatabaseService) {}

  async findMany(): Promise<FavoritesResponse> {
    return await this.db.favorites.findMany();
  }

  async addTrack(id: string) {
    await this.db.tracks.entityExistenceCheck(id);
    await this.db.favorites.tracks.create({ id });
  }

  async deleteTrack(trackId: string) {
    await this.db.favorites.tracks.delete(trackId);
  }

  async addAlbum(id: string) {
    await this.db.albums.entityExistenceCheck(id);
    await this.db.favorites.albums.create({ id });
  }

  async deleteAlbum(albumId: string) {
    await this.db.favorites.albums.delete(albumId);
  }

  async addArtist(id: string) {
    await this.db.artists.entityExistenceCheck(id);
    await this.db.favorites.artists.create({ id });
  }

  async deleteArtist(artistId: string) {
    await this.db.favorites.artists.delete(artistId);
  }
}
