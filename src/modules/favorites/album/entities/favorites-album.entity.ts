import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '@/modules/album/entities';

@Entity()
export class FavoritesAlbum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Album, { onDelete: 'CASCADE' })
  @JoinColumn()
  album: Album;
}
