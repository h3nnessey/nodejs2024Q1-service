import {
  IsDefined,
  IsOptional,
  IsString,
  IsUUID,
  IsNotEmpty,
  IsInt,
} from 'class-validator';
import { Album } from '../entities/album.entity';

export class CreateAlbumDto implements Omit<Album, 'id'> {
  @IsDefined()
  @IsOptional()
  @IsUUID('4')
  artistId: string | null;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsInt()
  @IsNotEmpty()
  year: number;
}
