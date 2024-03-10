import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { Favorites } from './entities';

@ApiTags('Favorites')
@Controller()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Gets all favorites tracks, albums and artists',
  })
  @ApiResponse({
    type: Favorites,
    description: 'Favorites tracks, albums and artists',
    status: HttpStatus.OK,
  })
  @Get()
  async findMany() {
    return this.favoritesService.findMany();
  }
}
