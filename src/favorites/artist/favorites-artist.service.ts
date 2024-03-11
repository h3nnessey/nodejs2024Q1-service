import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';

@Injectable()
export class FavoritesArtistService {
  constructor(private readonly db: DatabaseService) {}
  async add(id: string) {
    await this.db.artists.entityExistenceCheck(id);
    await this.db.favorites.artists.add(id);
  }

  async delete(artistId: string) {
    await this.db.favorites.artists.delete(artistId);
  }
}
