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
  @ApiCreatedResponse({
    description: 'Artist added to favorites',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Artist does not exist',
  })
  @ApiInvalidUuidResponse()
  @ApiUuidParam()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async add(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.favoritesArtistService.add(id);
  }

  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Deletes artist from favorites',
  })
  @ApiNoContentResponse({
    description: 'Artist deleted from favorites',
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
  })
  @ApiInvalidUuidResponse()
  @ApiUuidParam()
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.favoritesArtistService.delete(id);
  }
}
