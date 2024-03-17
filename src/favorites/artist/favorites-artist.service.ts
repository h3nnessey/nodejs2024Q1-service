import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from '@/artist/entities';
import { FavoritesArtist } from './entities';

@Injectable()
export class FavoritesArtistService {
  constructor(
    @InjectRepository(FavoritesArtist)
    private readonly favoritesArtistRepository: Repository<FavoritesArtist>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async add(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) {
      throw new UnprocessableEntityException('Artist does not exists');
    }

    await this.favoritesArtistRepository.save({ artist });
  }

  async delete(id: string) {
    const artist = await this.favoritesArtistRepository.findOne({
      where: { artist: { id } },
    });

    if (!artist) {
      throw new NotFoundException('Artist not in favorites');
    }

    await this.favoritesArtistRepository.remove(artist);
  }
}
