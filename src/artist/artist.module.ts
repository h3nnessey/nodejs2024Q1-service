import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from '@/track/track.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [TrackModule],
})
export class ArtistModule {}
