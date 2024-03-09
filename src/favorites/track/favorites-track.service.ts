import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';

@Injectable()
export class FavoritesTrackService {
  constructor(private readonly db: DatabaseService) {}
  async add(id: string) {
    await this.db.tracks.entityExistenceCheck(id);
    await this.db.favorites.tracks.add(id);
  }

  async delete(trackId: string) {
    await this.db.favorites.tracks.delete(trackId);
  }
}
