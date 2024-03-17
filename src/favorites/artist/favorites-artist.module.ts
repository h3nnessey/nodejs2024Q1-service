import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Artist } from '@/artist/entities';
import { FavoritesArtistController } from './favorites-artist.controller';
import { FavoritesArtistService } from './favorites-artist.service';
import { FavoritesArtist } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([FavoritesArtist, Artist])],
  exports: [FavoritesArtistService],
  controllers: [FavoritesArtistController],
  providers: [FavoritesArtistService],
})
export class FavoritesArtistModule {}
