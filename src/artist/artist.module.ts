import { Module } from '@nestjs/common';
import { TrackModule } from '@/track/track.module';
import { AlbumModule } from '@/album/album.module';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [TrackModule, AlbumModule],
})
export class ArtistModule {}
