import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from '@/modules/track/entities';

@Entity()
export class FavoritesTrack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Track, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  track: Track;
}
