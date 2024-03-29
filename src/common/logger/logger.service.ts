import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class LoggingService implements LoggerService {
  private readonly logger: ConsoleLogger;

  constructor() {
    this.logger = new ConsoleLogger('Logger', {
      // error => warn => log => debug => verbose (probably cannot disable fatal)
      logLevels: ['verbose'],
      timestamp: true,
    });
  }

  log(message: unknown, ...optionalParams: unknown[]) {
    this.logger.log(message, ...optionalParams);
  }
  error(message: unknown, ...optionalParams: unknown[]) {
    this.logger.error(message, ...optionalParams);
  }
  warn(message: unknown, ...optionalParams: unknown[]) {
    this.logger.warn(message, ...optionalParams);
  }

  debug?(message: unknown, ...optionalParams: unknown[]) {
    this.logger.debug(message, ...optionalParams);
  }

  verbose?(message: unknown, ...optionalParams: unknown[]) {
    this.logger.verbose(message, ...optionalParams);
  }

  fatal?(message: unknown, ...optionalParams: unknown[]) {
    this.logger.fatal(message, ...optionalParams);
  }
}
