import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  private readonly albums = new Map<string, Album>();

  create(createAlbumDto: CreateAlbumDto) {
    const album: Album = {
      id: uuidV4(),
      ...createAlbumDto,
    };

    this.albums.set(album.id, album);

    return album;
  }

  findAll() {
    return Array.from(this.albums.values());
  }

  findOne(id: string) {
    const album = this.albums.get(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);

    const updatedAlbum = this.albums
      .set(id, { ...album, ...updateAlbumDto })
      .get(album.id);

    return updatedAlbum;
  }

  remove(id: string) {
    const isExists = this.albums.has(id);

    if (!isExists) {
      throw new NotFoundException('Album not found');
    }

    this.albums.delete(id);
  }

  removeArtistFromAlbum(artistId: string) {
    const album = this.findAll().find((album) => album.artistId === artistId);

    if (album) {
      this.albums.set(album.id, {
        ...album,
        artistId: null,
      });
    }
  }
}
