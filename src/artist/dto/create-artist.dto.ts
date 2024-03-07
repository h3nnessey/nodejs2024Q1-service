import { IsDefined, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { Artist } from '../entities/artist.entity';

export class CreateArtistDto implements Omit<Artist, 'id'> {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
