import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from '@/track/entities';
import { FavoritesTrackService } from './favorites-track.service';
import { FavoritesTrackController } from './favorites-track.controller';
import { FavoritesTrack } from './entities/favorites-track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoritesTrack, Track])],
  controllers: [FavoritesTrackController],
  providers: [FavoritesTrackService],
})
export class FavoritesTrackModule {}
