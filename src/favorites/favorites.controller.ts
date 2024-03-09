import { Controller, Get } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './interfaces/favorites-response.interface';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findMany(): Promise<FavoritesResponse> {
    return await this.favoritesService.findMany();
  }
}
