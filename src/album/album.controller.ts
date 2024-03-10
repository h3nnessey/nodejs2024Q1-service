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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParseUUIDv4Pipe } from '@/common/pipes';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';
import { Album } from './entities';

@ApiTags('Albums')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiOperation({
    summary: 'Get all albums',
    description: 'Gets all albums',
  })
  @ApiResponse({
    type: [Album],
    description: 'Album list',
    status: HttpStatus.OK,
  })
  @Get()
  async findMany() {
    return this.albumService.findMany();
  }

  @ApiOperation({
    summary: 'Add new album',
    description: 'Adds new album',
  })
  @ApiResponse({
    type: Album,
    description: 'Added album information',
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    description: 'body does not contain required fields',
    status: HttpStatus.BAD_REQUEST,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @ApiOperation({
    summary: 'Get album by id',
    description: 'Gets album by id',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    type: Album,
    description: 'Album information',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'id is invalid (not UUID)',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Album not found',
    status: HttpStatus.NOT_FOUND,
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.albumService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update album by id',
    description: 'Updates album by id',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    type: Album,
    description: 'Updated album information',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'id is invalid (not UUID)',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Album not found',
    status: HttpStatus.NOT_FOUND,
  })
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
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    description: 'Album deleted',
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
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.albumService.delete(id);
  }
}
