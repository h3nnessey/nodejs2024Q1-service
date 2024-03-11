import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';

@Injectable()
export class FavoritesAlbumService {
  constructor(private readonly db: DatabaseService) {}
  async add(id: string) {
    await this.db.albums.entityExistenceCheck(id);
    await this.db.favorites.albums.add(id);
  }

  async delete(albumId: string) {
    await this.db.favorites.albums.delete(albumId);
  }
}
