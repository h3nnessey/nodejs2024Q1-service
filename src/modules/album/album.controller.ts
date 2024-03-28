import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiBearerControl,
  ApiInvalidBodyResponse,
  ApiInvalidUuidResponse,
  ApiUuidParam,
} from '@/common/swagger';
import { ParseUUIDv4Pipe } from '@/common/pipes';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';
import { Album } from './entities';

@ApiTags('Albums')
@ApiBearerControl()
@Controller()
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiOperation({
    summary: 'Get all albums',
    description: 'Gets all albums',
  })
  @ApiOkResponse({
    type: [Album],
    description: 'Album list',
  })
  @Get()
  async findMany() {
    return this.albumService.findMany();
  }

  @ApiOperation({
    summary: 'Add new album',
    description: 'Adds new album',
  })
  @ApiCreatedResponse({
    type: Album,
    description: 'Added album information',
  })
  @ApiInvalidBodyResponse()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @ApiOperation({
    summary: 'Get album by id',
    description: 'Gets album by id',
  })
  @ApiOkResponse({
    type: Album,
    description: 'Album information',
  })
  @ApiNotFoundResponse({
    description: 'Album not found',
  })
  @ApiInvalidUuidResponse()
  @ApiUuidParam()
  @Get(':id')
  async findOne(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.albumService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update album by id',
    description: 'Updates album by id',
  })
  @ApiOkResponse({
    type: Album,
    description: 'Updated album information',
  })
  @ApiNotFoundResponse({
    description: 'Album not found',
  })
  @ApiInvalidUuidResponse()
  @ApiUuidParam()
  @Put(':id')
  async update(
    @Param('id', ParseUUIDv4Pipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @ApiOperation({
    summary: 'Delete album by id',
    description: 'Deletes album by id',
  })
  @ApiNoContentResponse({
    description: 'Album deleted',
  })
  @ApiNotFoundResponse({
    description: 'Album not found',
  })
  @ApiInvalidUuidResponse()
  @ApiUuidParam()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.albumService.delete(id);
  }
}
