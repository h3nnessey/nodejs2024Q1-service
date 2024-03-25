import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Track } from '@/modules/track/entities';
import { Artist } from '@/modules/artist/entities';
import { CreateAlbumDto } from '../dto';

@Entity()
export class Album implements CreateAlbumDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '316ceb21-4a71-4371-abf9-5f35c8cfef9c',
    description: 'Album id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Artist id',
    example: '02bded4c-fe9a-41c2-807e-71d991c0c5db',
    nullable: true,
  })
  @Column({
    type: 'uuid',
    nullable: true,
    default: null,
  })
  @ManyToOne(() => Artist, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({
    name: 'artistId',
    referencedColumnName: 'id',
  })
  artistId: string | null;

  @ApiProperty({
    type: 'string',
    description: 'Album name',
    example: 'Queen',
  })
  @Column()
  name: string;

  @ApiProperty({
    type: 'integer',
    description: 'Year of release',
    example: 1978,
  })
  @Column({ type: 'integer', default: new Date().getFullYear() })
  year: number;

  @OneToMany(() => Track, (track) => track.id)
  trackIds: string[];
}
