import { Module } from '@nestjs/common';
import { TrackModule } from '@/track/track.module';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
  imports: [TrackModule],
})
export class AlbumModule {}
