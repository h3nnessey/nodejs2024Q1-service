import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiBearerControl } from '@/common/swagger';
import { FavoritesService } from './favorites.service';
import { Favorites } from './entities';

@ApiTags('Favorites')
@ApiBearerControl()
@Controller()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Gets all favorites tracks, albums and artists',
  })
  @ApiOkResponse({
    type: Favorites,
    description: 'Favorites tracks, albums and artists',
  })
  @Get()
  async findMany() {
    return this.favoritesService.findMany();
  }
}
