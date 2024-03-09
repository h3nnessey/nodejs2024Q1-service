import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesTrackModule } from './track/favorites-track.module';
import { FavoritesArtistModule } from './artist/favorites-artist.module';
import { FavoritesAlbumModule } from './album/favorites-album.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [FavoritesTrackModule, FavoritesArtistModule, FavoritesAlbumModule],
})
export class FavoritesModule {}
