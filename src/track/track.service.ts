import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  private readonly tracks = new Map<string, Track>();

  create(createTrackDto: CreateTrackDto) {
    const track: Track = {
      id: uuidV4(),
      ...createTrackDto,
    };

    this.tracks.set(track.id, track);

    return track;
  }

  findAll() {
    return Array.from(this.tracks.values());
  }

  findOne(id: string) {
    const track = this.tracks.get(id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);

    const updatedTrack = this.tracks
      .set(track.id, {
        ...track,
        ...updateTrackDto,
      })
      .get(track.id);

    return updatedTrack;
  }

  remove(id: string) {
    const isExists = this.tracks.has(id);

    if (!isExists) {
      throw new NotFoundException('Track not found');
    }

    this.tracks.delete(id);
  }

  removeArtistFromTrack(artistId: string) {
    const track = this.findAll().find((track) => track.artistId === artistId);

    if (track) {
      this.tracks.set(track.id, {
        ...track,
        artistId: null,
      });
    }
  }

  removeAlbumFromTrack(albumId: string) {
    const track = this.findAll().find((track) => track.albumId === albumId);

    if (track) {
      this.tracks.set(track.id, {
        ...track,
        albumId: null,
      });
    }
  }
}
