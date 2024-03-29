import { Injectable, LogLevel, LoggerService } from '@nestjs/common';

@Injectable()
export class LoggingService implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log('Method not implemented.');
  }
  error(message: any, ...optionalParams: any[]) {
    console.log('Method not implemented.');
  }
  warn(message: any, ...optionalParams: any[]) {
    console.log('Method not implemented.');
  }
  debug?(message: any, ...optionalParams: any[]) {
    console.log('Method not implemented.');
  }
  verbose?(message: any, ...optionalParams: any[]) {
    console.log('Method not implemented.');
  }
  fatal?(message: any, ...optionalParams: any[]) {
    console.log('Method not implemented.');
  }
  setLogLevels?(levels: LogLevel[]) {
    console.log('Method not implemented.');
  }
}
