import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Track } from '../entities/track.entity';

export class CreateTrackDto implements Omit<Track, 'id'> {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsOptional()
  @IsUUID('4')
  artistId: string | null;

  @IsDefined()
  @IsOptional()
  @IsUUID('4')
  albumId: string | null;

  @IsDefined()
  @IsInt()
  @IsPositive()
  @Min(1)
  duration: number;
}