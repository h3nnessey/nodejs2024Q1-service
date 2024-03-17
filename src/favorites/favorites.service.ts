import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesTrack } from './track/entities/favorites-track.entity';
import { FavoritesAlbum } from './album/entities';
import { FavoritesArtist } from './artist/entities';

@Injectable()
export class FavoritesService {
  // replace with services
  constructor(
    @InjectRepository(FavoritesTrack)
    private readonly favoritesTrackRepository: Repository<FavoritesTrack>,
    @InjectRepository(FavoritesAlbum)
    private readonly favoritesAlbumRepository: Repository<FavoritesAlbum>,
    @InjectRepository(FavoritesArtist)
    private readonly favoritesArtistRepository: Repository<FavoritesArtist>,
  ) {}

  async findMany() {
    const tracks = await this.favoritesTrackRepository.find({
      relations: { track: true },
    });

    const albums = await this.favoritesAlbumRepository.find({
      relations: { album: true },
    });

    const artists = await this.favoritesArtistRepository.find({
      relations: { artist: true },
    });

    return {
      tracks: tracks.map(({ track }) => track),
      albums: albums.map(({ album }) => album),
      artists: artists.map(({ artist }) => artist),
    };
  }
}
