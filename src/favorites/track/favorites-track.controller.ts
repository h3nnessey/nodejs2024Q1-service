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
import { FavoritesTrackService } from './favorites-track.service';

@ApiTags('Favorites')
@Controller()
export class FavoritesTrackController {
  constructor(private readonly favoritesTrackService: FavoritesTrackService) {}

  @ApiOperation({
    summary: 'Add track to the favorites',
    description: 'Adds track to the favorites',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    description: 'Track added to favorites',
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    description: 'id is invalid (not UUID)',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Track does not exist',
    status: HttpStatus.UNPROCESSABLE_ENTITY,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async add(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.favoritesTrackService.add(id);
  }

  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Deletes track from favorites',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    description: 'Track deleted from favorites',
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    description: 'id is invalid (not UUID)',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Track not found',
    status: HttpStatus.NOT_FOUND,
  })
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.favoritesTrackService.delete(id);
  }
}
