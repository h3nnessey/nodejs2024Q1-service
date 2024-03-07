import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Album } from '../entities/album.entity';

export class UpdateAlbumDto implements Omit<Album, 'id'> {
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
