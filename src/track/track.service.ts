import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { DatabaseService } from '@/database/database.service';
import { CreateTrackDto, UpdateTrackDto } from './dto/';

@Injectable()
export class TrackService {
  constructor(private readonly db: DatabaseService) {}

  async create(createTrackDto: CreateTrackDto) {
    return this.db.tracks.create({
      id: uuidV4(),
      ...createTrackDto,
    });
  }

  async findMany() {
    return this.db.tracks.findMany();
  }

  async findOne(id: string) {
    return this.db.tracks.findOne(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.db.tracks.update(id, updateTrackDto);
  }

  async delete(id: string) {
    await this.db.favorites.tracks.delete(id);
    await this.db.tracks.delete(id);
  }
}
