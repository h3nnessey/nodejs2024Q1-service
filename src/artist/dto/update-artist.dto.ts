import { OmitType } from '@nestjs/swagger';
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends OmitType(CreateArtistDto, [] as const) {}
