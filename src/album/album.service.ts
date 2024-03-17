import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';
import { Album } from './entities';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return this.albumRepository.save(createAlbumDto);
  }

  async findMany() {
    return this.albumRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return this.albumRepository.save({ ...album, updateAlbumDto });
  }

  async delete(id: string) {
    const user = await this.albumRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Album not found');
    }

    await this.albumRepository.remove(user);
  }
}
