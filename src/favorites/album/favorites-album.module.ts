import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '@/album/entities';
import { FavoritesAlbumController } from './favorites-album.controller';
import { FavoritesAlbumService } from './favorites-album.service';
import { FavoritesAlbum } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([FavoritesAlbum, Album])],
  controllers: [FavoritesAlbumController],
  providers: [FavoritesAlbumService],
})
export class FavoritesAlbumModule {}
