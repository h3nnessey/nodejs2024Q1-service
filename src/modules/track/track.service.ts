import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto, UpdateTrackDto } from './dto/';
import { Track } from './entities';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    return this.trackRepository.save(createTrackDto);
  }

  async findMany() {
    return this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);

    return this.trackRepository.save({ ...track, updateTrackDto });
  }

  async delete(id: string) {
    const track = await this.findOne(id);

    await this.trackRepository.remove(track);
  }
}
