import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesTrackModule } from './track/favorites-track.module';
import { FavoritesArtistModule } from './artist/favorites-artist.module';
import { FavoritesAlbumModule } from './album/favorites-album.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    FavoritesTrackModule,
    FavoritesArtistModule,
    FavoritesAlbumModule,
    RouterModule.register([
      {
        path: 'favs',
        module: FavoritesModule,
        children: [
          {
            path: 'track/:id',
            module: FavoritesTrackModule,
          },
          {
            path: 'artist/:id',
            module: FavoritesArtistModule,
          },
          {
            path: 'album/:id',
            module: FavoritesAlbumModule,
          },
        ],
      },
    ]),
  ],
})
export class FavoritesModule {}
