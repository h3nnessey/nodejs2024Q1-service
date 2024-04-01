import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { config } from '@/config/env';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  constructor() {
    super('Logger', {
      logLevels: [config.logLevel],
      timestamp: true,
    });
  }

  log(message: unknown, ...optionalParams: unknown[]) {
    super.log(message, ...optionalParams);
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    super.error(message, ...optionalParams);
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    super.warn(message, ...optionalParams);
  }

  debug(message: unknown, ...optionalParams: unknown[]) {
    super.debug(message, ...optionalParams);
  }

  verbose(message: unknown, ...optionalParams: unknown[]) {
    super.verbose(message, ...optionalParams);
  }

  fatal(message: unknown, ...optionalParams: unknown[]) {
    super.fatal(message, ...optionalParams);
  }
}
