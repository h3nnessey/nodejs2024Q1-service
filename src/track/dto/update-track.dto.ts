import { OmitType } from '@nestjs/swagger';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends OmitType(CreateTrackDto, [] as const) {}
