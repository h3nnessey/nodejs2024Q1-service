import { Module } from '@nestjs/common';
import { FavoritesArtistController } from './favorites-artist.controller';
import { FavoritesArtistService } from './favorites-artist.service';

@Module({
  controllers: [FavoritesArtistController],
  providers: [FavoritesArtistService],
})
export class FavoritesArtistModule {}
