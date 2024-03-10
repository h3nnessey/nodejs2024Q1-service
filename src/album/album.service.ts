import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { DatabaseService } from '@/database/database.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';

@Injectable()
export class AlbumService {
  constructor(private readonly db: DatabaseService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return this.db.albums.create({
      id: uuidV4(),
      ...createAlbumDto,
    });
  }

  async findMany() {
    return this.db.albums.findMany();
  }

  async findOne(id: string) {
    return this.db.albums.findOne(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.db.albums.update(id, updateAlbumDto);
  }

  async delete(id: string) {
    const tracks = (await this.db.tracks.findMany()).filter(
      (track) => track.albumId === id,
    );

    tracks.forEach(async (track) => {
      await this.db.tracks.update(track.id, { albumId: null });
    });

    await this.db.favorites.albums.delete(id);
    await this.db.albums.delete(id);
  }
}
