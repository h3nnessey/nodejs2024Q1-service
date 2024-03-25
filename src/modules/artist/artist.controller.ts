import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  Delete,
  Post,
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
  ApiInvalidBodyResponse,
  ApiInvalidUuidResponse,
  ApiUuidParam,
} from '@/common/swagger';
import { ParseUUIDv4Pipe } from '@/common/pipes';
import { ArtistService } from './artist.service';
import { CreateArtistDto, UpdateArtistDto } from './dto';
import { Artist } from './entities';

@ApiTags('Artists')
@Controller()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @ApiOperation({
    summary: 'Get all artists',
    description: 'Gets all artists',
  })
  @ApiOkResponse({
    type: [Artist],
    description: 'Artist list',
  })
  @Get()
  async findMany() {
    return this.artistService.findMany();
  }

  @ApiOperation({
    summary: 'Add new artist',
    description: 'Adds new artist',
  })
  @ApiCreatedResponse({
    type: Artist,
    description: 'Added artist information',
  })
  @ApiInvalidBodyResponse()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @ApiOperation({
    summary: 'Get artist by id',
    description: 'Gets artist by id',
  })
  @ApiOkResponse({
    type: Artist,
    description: 'Artist information',
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiInvalidUuidResponse()
  @ApiUuidParam()
  @Get(':id')
  async findOne(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.artistService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update artist by id',
    description: 'Updates artist by id',
  })
  @ApiOkResponse({
    type: Artist,
    description: 'Updated artist information',
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
  })
  @ApiInvalidUuidResponse()
  @ApiUuidParam()
  @Put(':id')
  async update(
    @Param('id', ParseUUIDv4Pipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @ApiOperation({
    summary: 'Delete artist by id',
    description: 'Deletes artist by id',
  })
  @ApiNoContentResponse({
    description: 'Artist deleted',
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
  })
  @ApiInvalidUuidResponse()
  @ApiUuidParam()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.artistService.delete(id);
  }
}
