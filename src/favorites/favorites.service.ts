import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { FavoritesResponse } from './interfaces/favorites-response.interface';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: DatabaseService) {}

  async findMany(): Promise<FavoritesResponse> {
    return this.db.favorites.findMany();
  }
}
