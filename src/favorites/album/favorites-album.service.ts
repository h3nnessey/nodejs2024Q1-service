import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '@/album/entities';
import { FavoritesAlbum } from './entities';

@Injectable()
export class FavoritesAlbumService {
  constructor(
    @InjectRepository(FavoritesAlbum)
    private readonly favoritesAlbumRepository: Repository<FavoritesAlbum>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async add(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album) {
      throw new UnprocessableEntityException('Album does not exists');
    }

    await this.favoritesAlbumRepository.save({ album });
  }

  async delete(id: string) {
    const album = await this.favoritesAlbumRepository.findOne({
      where: { album: { id } },
    });

    if (!album) {
      throw new NotFoundException('Album not in favorites');
    }

    await this.favoritesAlbumRepository.remove(album);
  }

  async findMany() {
    return (
      await this.favoritesAlbumRepository.find({
        relations: { album: true },
      })
    ).map(({ album }) => album);
  }
}
