import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: DatabaseService) {}

  async findMany() {
    return this.db.favorites.findMany();
  }
}
