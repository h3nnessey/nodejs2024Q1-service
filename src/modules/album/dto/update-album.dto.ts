import { OmitType } from '@nestjs/swagger';
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends OmitType(CreateAlbumDto, [] as const) {}
