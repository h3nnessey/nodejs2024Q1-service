import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from '@/track/entities';
import { FavoritesTrack } from './entities/favorites-track.entity';

@Injectable()
export class FavoritesTrackService {
  constructor(
    @InjectRepository(FavoritesTrack)
    private readonly favoritesTrackRepository: Repository<FavoritesTrack>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async add(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track) {
      throw new UnprocessableEntityException('Track does not exists');
    }

    await this.favoritesTrackRepository.save({ track });
  }

  async delete(id: string) {
    const track = await this.favoritesTrackRepository.findOne({
      where: { track: { id } },
    });

    if (!track) {
      throw new NotFoundException('Track not in favorites');
    }

    await this.favoritesTrackRepository.remove(track);
  }
}
