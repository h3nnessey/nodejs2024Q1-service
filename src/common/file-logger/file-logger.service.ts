import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class FileLoggerService implements LoggerService {
  log(message: unknown, ...optionalParams: unknown[]) {
    this.writeLog();
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    this.writeErrorLog();
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    this.writeLog();
  }

  debug(message: unknown, ...optionalParams: unknown[]) {
    this.writeLog();
  }

  verbose(message: unknown, ...optionalParams: unknown[]) {
    this.writeLog();
  }

  fatal(message: unknown, ...optionalParams: unknown[]) {
    this.writeErrorLog();
  }

  async writeLog() {
    console.log('asdasd');
  }

  async writeErrorLog() {}
}
