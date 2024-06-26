import {
  Controller,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  ApiBearerControl,
  ApiInvalidUuidResponse,
  ApiUuidParam,
} from '@/common/swagger';
import { ParseUUIDv4Pipe } from '@/common/pipes';
import { FavoritesAlbumService } from './favorites-album.service';

@ApiTags('Favorites')
@ApiBearerControl()
@Controller()
export class FavoritesAlbumController {
  constructor(private readonly favoritesAlbumService: FavoritesAlbumService) {}

  @ApiOperation({
    summary: 'Add album to the favorites',
    description: 'Adds album to the favorites',
  })
  @ApiCreatedResponse({
    description: 'Album added to favorites',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Album does not exist',
  })
  @ApiInvalidUuidResponse()
  @ApiUuidParam()
  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  async add(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.favoritesAlbumService.add(id);
  }

  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Deletes album from favorites',
  })
  @ApiNoContentResponse({
    description: 'Album deleted from favorites',
  })
  @ApiNotFoundResponse({
    description: 'Album not found',
  })
  @ApiInvalidUuidResponse()
  @ApiUuidParam()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.favoritesAlbumService.delete(id);
  }
}
