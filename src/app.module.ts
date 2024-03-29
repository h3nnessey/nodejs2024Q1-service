import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  APP_FILTER,
  APP_GUARD,
  APP_INTERCEPTOR,
  RouterModule,
} from '@nestjs/core';
import { LoggingInterceptor } from '@/common/interceptors/';
import { dataSourceOptions } from '@/config/datasource';
import { Routes } from '@/config/routes';
import { LoggingModule } from '@/common/logger/logger.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { TrackModule } from '@/modules/track/track.module';
import { ArtistModule } from '@/modules/artist/artist.module';
import { AlbumModule } from '@/modules/album/album.module';
import { FavoritesModule } from '@/modules/favorites/favorites.module';
import { FavoritesTrackModule } from '@/modules/favorites/track/favorites-track.module';
import { FavoritesArtistModule } from '@/modules/favorites/artist/favorites-artist.module';
import { FavoritesAlbumModule } from '@/modules/favorites/album/favorites-album.module';
import { AccessTokenGuard } from '@/modules/auth/guards';
import { AllExceptionsFilter } from './common/filters';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      synchronize: false,
    }),
    LoggingModule,
    AuthModule,
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    FavoritesTrackModule,
    FavoritesArtistModule,
    FavoritesAlbumModule,
    RouterModule.register([
      { path: Routes.Auth, module: AuthModule },
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
