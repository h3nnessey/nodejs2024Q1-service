import {
  Controller,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParseUUIDv4Pipe } from '@/common/pipes';
import { FavoritesAlbumService } from './favorites-album.service';

@ApiTags('Favorites')
@Controller()
export class FavoritesAlbumController {
  constructor(private readonly favoritesAlbumService: FavoritesAlbumService) {}

  @ApiOperation({
    summary: 'Add album to the favorites',
    description: 'Adds album to the favorites',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    description: 'Album added to favorites',
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    description: 'id is invalid (not UUID)',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Album does not exist',
    status: HttpStatus.UNPROCESSABLE_ENTITY,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async add(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.favoritesAlbumService.add(id);
  }

  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Deletes album from favorites',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    description: 'Album deleted from favorites',
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    description: 'id is invalid (not UUID)',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Album not found',
    status: HttpStatus.NOT_FOUND,
  })
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.favoritesAlbumService.delete(id);
  }
}
