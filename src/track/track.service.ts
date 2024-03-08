import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { DatabaseService } from '@/database/database.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private readonly db: DatabaseService) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.db.tracks.create({
      id: uuidV4(),
      ...createTrackDto,
    });
  }

  async findMany() {
    return await this.db.tracks.findMany();
  }

  async findOne(id: string) {
    return await this.db.tracks.findOne(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    return await this.db.tracks.update(id, updateTrackDto);
  }

  async delete(id: string) {
    await this.db.favorites.tracks.delete(id, true);
    await this.db.tracks.delete(id);
  }
}
