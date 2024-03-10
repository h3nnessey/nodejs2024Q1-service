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

@Controller()
export class FavoritesArtistController {
  constructor(
    private readonly favoritesArtistService: FavoritesArtistService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async add(@Param('id', ParseUUIDv4Pipe) id: string) {
    return await this.favoritesArtistService.add(id);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDv4Pipe) id: string) {
    return await this.favoritesArtistService.delete(id);
  }
}
