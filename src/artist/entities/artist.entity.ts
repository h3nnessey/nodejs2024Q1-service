import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Track } from '@/track/entities';
import { Album } from '@/album/entities';
import { CreateArtistDto } from '../dto';

@Entity()
export class Artist implements CreateArtistDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '5cdb3910-b777-4ce3-9eea-a9b62584541a',
    description: 'Artist ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'Freddie Mercury',
    description: 'Artist name',
  })
  @Column()
  name: string;

  @ApiProperty({
    type: 'boolean',
    example: false,
    description: 'Has Grammy award',
  })
  @Column({ default: false })
  grammy: boolean;

  @OneToMany(() => Track, (track) => track.id)
  trackIds: string[];

  @OneToMany(() => Album, (album) => album.id)
  albumIds: string[];
}
