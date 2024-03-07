import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  private readonly artists = new Map<string, Artist>();

  create(createArtistDto: CreateArtistDto) {
    const artist: Artist = {
      id: uuidV4(),
      ...createArtistDto,
    };

    this.artists.set(artist.id, artist);

    return artist;
  }

  findAll() {
    return Array.from(this.artists.values());
  }

  findOne(id: string) {
    const artist = this.artists.get(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.artists.get(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    this.artists.set(artist.id, {
      ...artist,
      ...updateArtistDto,
    });

    return this.artists.get(artist.id);
  }

  remove(id: string) {
    const artist = this.artists.get(id);

    if (!artist) {
      throw new NotFoundException('Track not found');
    }

    this.artists.delete(artist.id);
  }
}
