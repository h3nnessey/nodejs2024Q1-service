import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesArtist } from './artist/entities/favorites-artist.entity';
import { FavoritesTrack } from './track/entities/favorites-track.entity';
import { FavoritesAlbum } from './album/entities/favorites-album.entity';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesTrackModule } from './track/favorites-track.module';
import { FavoritesArtistModule } from './artist/favorites-artist.module';
import { FavoritesAlbumModule } from './album/favorites-album.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    TypeOrmModule.forFeature([FavoritesAlbum, FavoritesTrack, FavoritesArtist]),
    FavoritesTrackModule,
    FavoritesArtistModule,
    FavoritesAlbumModule,
  ],
})
export class FavoritesModule {}
