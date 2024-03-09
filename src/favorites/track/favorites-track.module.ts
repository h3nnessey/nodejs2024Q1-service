import { Module } from '@nestjs/common';
import { FavoritesTrackService } from './favorites-track.service';
import { FavoritesTrackController } from './favorites-track.controller';

@Module({
  controllers: [FavoritesTrackController],
  providers: [FavoritesTrackService],
})
export class FavoritesTrackModule {}
