import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParseUUIDv4Pipe } from '@/common/pipes';
import { TrackService } from './track.service';
import { CreateTrackDto, UpdateTrackDto } from './dto';
import { Track } from './entities';

@ApiTags('Tracks')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @ApiOperation({
    summary: 'Get all tracks',
    description: 'Gets all tracks',
  })
  @ApiResponse({
    type: [Track],
    description: 'Track list',
    status: HttpStatus.OK,
  })
  @Get()
  async findMany() {
    return this.trackService.findMany();
  }

  @ApiOperation({
    summary: 'Add new track',
    description: 'Adds new track information',
  })
  @ApiResponse({
    type: Track,
    description: 'Added track information',
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    description: 'body does not contain required fields',
    status: HttpStatus.BAD_REQUEST,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @ApiOperation({
    summary: 'Get track by id',
    description: 'Gets track by id',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    type: Track,
    description: 'Track information',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'id is invalid (not UUID)',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Track not found',
    status: HttpStatus.NOT_FOUND,
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.trackService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update track by id',
    description: 'Updates track by id',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    type: Track,
    description: 'Updated track',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'id is invalid (not UUID)',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Track not found',
    status: HttpStatus.NOT_FOUND,
  })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDv4Pipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
  }

  @ApiOperation({
    summary: 'Delete track by id',
    description: 'Deletes track by id',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    description: 'Track deleted',
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
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.trackService.delete(id);
  }
}
