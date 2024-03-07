import { Injectable, ParseUUIDPipe } from '@nestjs/common';

@Injectable()
export class ParseUUIDv4Pipe extends ParseUUIDPipe {
  constructor() {
    super({ version: '4' });
  }
}
