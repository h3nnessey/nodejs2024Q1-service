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
import { ApiInvalidUuidResponse, ApiUuidParam } from '@/common/swagger';
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
  @ApiCreatedResponse({
    description: 'Track added to favorites',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Track does not exist',
  })
  @ApiInvalidUuidResponse()
  @ApiUuidParam()
  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  async add(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.favoritesTrackService.add(id);
  }

  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Deletes track from favorites',
  })
  @ApiNoContentResponse({
    description: 'Track deleted from favorites',
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
  })
  @ApiInvalidUuidResponse()
  @ApiUuidParam()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.favoritesTrackService.delete(id);
  }
}
