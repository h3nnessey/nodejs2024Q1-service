import { User } from '@/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Database } from './database';
import { Track } from '@/track/entities/track.entity';
import { Artist } from '@/artist/entities/artist.entity';
import { Album } from '@/album/entities/album.entity';

@Injectable()
export class DatabaseService {
  public readonly users = new Database<User>();
  public readonly tracks = new Database<Track>();
  public readonly artists = new Database<Artist>();
  public readonly albums = new Database<Album>();
}
