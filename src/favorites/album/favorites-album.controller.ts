import {
  Controller,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ParseUUIDv4Pipe } from '@/common/pipes';
import { FavoritesAlbumService } from './favorites-album.service';

@Controller()
export class FavoritesAlbumController {
  constructor(private readonly favoritesAlbumService: FavoritesAlbumService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async add(@Param('id', ParseUUIDv4Pipe) id: string) {
    return await this.favoritesAlbumService.add(id);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDv4Pipe) id: string) {
    return await this.favoritesAlbumService.delete(id);
  }
}