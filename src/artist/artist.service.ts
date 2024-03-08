import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { DatabaseService } from '@/database/database.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DatabaseService) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.db.artists.create({
      id: uuidV4(),
      ...createArtistDto,
    });
  }

  async findMany() {
    return await this.db.artists.findMany();
  }

  async findOne(id: string) {
    return await this.db.artists.findOne(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    return await this.db.artists.update(id, updateArtistDto);
  }

  async delete(id: string) {
    const tracks = (await this.db.tracks.findMany()).filter(
      (track) => track.artistId === id,
    );
    const albums = (await this.db.albums.findMany()).filter(
      (album) => album.artistId === id,
    );

    tracks.forEach(async (track) => {
      await this.db.tracks.update(track.id, { artistId: null });
    });

    albums.forEach(async (album) => {
      await this.db.albums.update(album.id, { artistId: null });
    });

    await this.db.favorites.artists.delete(id, true);
    await this.db.artists.delete(id);
  }
}
