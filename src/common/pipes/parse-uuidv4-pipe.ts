import { ParseUUIDPipe } from '@nestjs/common';

export class ParseUUIDv4Pipe extends ParseUUIDPipe {
  constructor() {
    super({ version: '4' });
  }
}
