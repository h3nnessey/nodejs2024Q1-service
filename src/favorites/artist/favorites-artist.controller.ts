import {
  Controller,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ParseUUIDv4Pipe } from '@/common/pipes';
import { FavoritesArtistService } from './favorites-artist.service';

@Controller('favs/artist')
export class FavoritesArtistController {
  constructor(
    private readonly favoritesArtistService: FavoritesArtistService,
  ) {}

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  async add(@Param('id', ParseUUIDv4Pipe) id: string) {
    return await this.favoritesArtistService.add(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDv4Pipe) id: string) {
    return await this.favoritesArtistService.delete(id);
  }
}
