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
import { ParseUUIDv4Pipe } from '@/utils/pipes';
import { AlbumService } from '@/album/album.service';
import { TrackService } from '@/track/track.service';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDv4Pipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDv4Pipe) id: string) {
    this.trackService.removeArtistFromTrack(id);
    this.albumService.removeArtistFromAlbum(id);

    return this.artistService.remove(id);
  }
}