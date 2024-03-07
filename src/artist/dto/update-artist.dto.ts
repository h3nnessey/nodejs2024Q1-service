import { IsDefined, IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { Artist } from '../entities/artist.entity';

export class UpdateArtistDto implements Omit<Artist, 'id'> {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
