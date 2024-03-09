import { Module } from '@nestjs/common';
import { FavoritesAlbumController } from './favorites-album.controller';
import { FavoritesAlbumService } from './favorites-album.service';

@Module({
  controllers: [FavoritesAlbumController],
  providers: [FavoritesAlbumService],
})
export class FavoritesAlbumModule {}
