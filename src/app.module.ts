import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';
import { dataSourceOptions } from '@/config/datasource';
import { Routes } from '@/config/routes';
import { UserModule } from '@/modules/user/user.module';
import { TrackModule } from '@/modules/track/track.module';
import { ArtistModule } from '@/modules/artist/artist.module';
import { AlbumModule } from '@/modules/album/album.module';
import { FavoritesModule } from '@/modules/favorites/favorites.module';
import { FavoritesTrackModule } from '@/modules/favorites/track/favorites-track.module';
import { FavoritesArtistModule } from '@/modules/favorites/artist/favorites-artist.module';
import { FavoritesAlbumModule } from '@/modules/favorites/album/favorites-album.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      synchronize: false,
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
