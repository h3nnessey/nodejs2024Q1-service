import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '@/artist/entities';

@Entity()
export class FavoritesArtist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Artist, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  artist: Artist;
}
