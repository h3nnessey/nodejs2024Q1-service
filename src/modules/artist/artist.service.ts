import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto, UpdateArtistDto } from './dto';
import { Artist } from './entities';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    return this.artistRepository.save(createArtistDto);
  }

  async findMany() {
    return this.artistRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);

    return this.artistRepository.save({ ...artist, ...updateArtistDto });
  }

  async delete(id: string) {
    const artist = await this.findOne(id);

    await this.artistRepository.remove(artist);
  }
}
