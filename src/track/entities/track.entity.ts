import { ApiProperty } from '@nestjs/swagger';
import { CreateTrackDto } from '../dto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// relations: favs
// await this.db.favorites.tracks.delete(id);
// await this.db.tracks.delete(id);
@Entity()
export class Track implements CreateTrackDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: 'aed621bd-fdb6-41ce-b092-d9861a2a2330',
    description: 'Track id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: 'string',
    description: 'Track name',
    example: 'Courtesy Call',
  })
  @Column()
  name: string;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '7d0a94e4-5703-4c99-b959-3688805d8610',
    description: 'Artist ID',
    nullable: true,
  })
  @Column({
    type: 'uuid',
    nullable: true,
    default: null,
  })
  artistId: string | null;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '4d8ee4c0-34f0-42e8-a1f7-c992163956fa',
    description: 'Album ID',
    nullable: true,
  })
  @Column({
    type: 'uuid',
    nullable: true,
    default: null,
  })
  albumId: string | null;

  @ApiProperty({
    type: 'integer',
    example: 240,
    description: 'Track duration in seconds',
  })
  @Column({
    type: 'integer',
  })
  duration: number;
}
