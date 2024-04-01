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
import { TrackService } from './track.service';
import { CreateTrackDto, UpdateTrackDto } from './dto';
import { Track } from './entities';

@ApiTags('Tracks')
@ApiBearerControl()
@Controller()
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @ApiOperation({
    summary: 'Get all tracks',
    description: 'Gets all tracks',
  })
  @ApiOkResponse({
    type: [Track],
    description: 'Track list',
  })
  @Get()
  async findMany() {
    return this.trackService.findMany();
  }

  @ApiOperation({
    summary: 'Add new track',
    description: 'Adds new track information',
  })
  @ApiCreatedResponse({
    type: Track,
    description: 'Added track information',
  })
  @ApiInvalidBodyResponse()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @ApiOperation({
    summary: 'Get track by id',
    description: 'Gets track by id',
  })
  @ApiOkResponse({
    type: Track,
    description: 'Track information',
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
  })
  @ApiInvalidUuidResponse()
  @ApiUuidParam()
  @Get(':id')
  async findOne(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.trackService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update track by id',
    description: 'Updates track by id',
  })
  @ApiOkResponse({
    type: Track,
    description: 'Updated track',
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
  })
  @ApiInvalidUuidResponse()
  @ApiUuidParam()
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
  @ApiNoContentResponse({
    description: 'Track deleted',
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
  })
  @ApiInvalidUuidResponse()
  @ApiUuidParam()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.trackService.delete(id);
  }
}
