import {
  Controller,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ParseUUIDv4Pipe } from '@/common/pipes';
import { FavoritesTrackService } from './favorites-track.service';

@Controller()
export class FavoritesTrackController {
  constructor(private readonly favoritesTrackService: FavoritesTrackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async add(@Param('id', ParseUUIDv4Pipe) id: string) {
    return await this.favoritesTrackService.add(id);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDv4Pipe) id: string) {
    return await this.favoritesTrackService.delete(id);
  }
}
