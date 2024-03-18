import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';
import { config } from '@/config/env';
import { Routes } from '@/config/routes';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { FavoritesTrackModule } from './favorites/track/favorites-track.module';
import { FavoritesArtistModule } from './favorites/artist/favorites-artist.module';
import { FavoritesAlbumModule } from './favorites/album/favorites-album.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config.DB_CONNECTION,
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    FavoritesTrackModule,
    FavoritesArtistModule,
    FavoritesAlbumModule,
    RouterModule.register([
      { path: Routes.Users, module: UserModule },
      { path: Routes.Tracks, module: TrackModule },
      { path: Routes.Artists, module: ArtistModule },
      { path: Routes.Albums, module: AlbumModule },
      {
        path: Routes.Favorites,
        module: FavoritesModule,
        children: [
          {
            path: Routes.FavoritesTracks,
            module: FavoritesTrackModule,
          },
          {
            path: Routes.FavoritesArtists,
            module: FavoritesArtistModule,
          },
          {
            path: Routes.FavoritesAlbums,
            module: FavoritesAlbumModule,
          },
        ],
      },
    ]),
  ],
})
export class AppModule {}
