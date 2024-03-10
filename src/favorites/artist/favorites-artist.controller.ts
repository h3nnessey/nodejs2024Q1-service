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
import { FavoritesArtistService } from './favorites-artist.service';

@ApiTags('Favorites')
@Controller()
export class FavoritesArtistController {
  constructor(
    private readonly favoritesArtistService: FavoritesArtistService,
  ) {}

  @ApiOperation({
    summary: 'Add artist to the favorites',
    description: 'Adds artist to the favorites',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    description: 'Artist added to favorites',
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    description: 'id is invalid (not UUID)',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Artist does not exist',
    status: HttpStatus.UNPROCESSABLE_ENTITY,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async add(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.favoritesArtistService.add(id);
  }

  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Deletes artist from favorites',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    description: 'Artist deleted from favorites',
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    description: 'id is invalid (not UUID)',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Artist not found',
    status: HttpStatus.NOT_FOUND,
  })
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.favoritesArtistService.delete(id);
  }
}
