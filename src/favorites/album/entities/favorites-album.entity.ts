import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '@/album/entities';

@Entity()
export class FavoritesAlbum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Album, { onDelete: 'CASCADE' })
  @JoinColumn()
  album: Album;
}
