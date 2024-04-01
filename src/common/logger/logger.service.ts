import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { FileLoggerService } from '@/common/file-logger/file-logger.service';
import { config } from '@/config/env';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  constructor(private readonly fileLogger: FileLoggerService) {
    super('Logger', {
      logLevels: [config.logs.level],
      timestamp: true,
    });
  }

  log(message: unknown, ...optionalParams: unknown[]) {
    super.log(message, ...optionalParams);
    this.fileLogger.log(message);
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    super.error(message, ...optionalParams);
    this.fileLogger.error(message);
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    super.warn(message, ...optionalParams);
    this.fileLogger.warn(message);
  }

  debug(message: unknown, ...optionalParams: unknown[]) {
    super.debug(message, ...optionalParams);
    this.fileLogger.debug(message);
  }

  verbose(message: unknown, ...optionalParams: unknown[]) {
    super.verbose(message, ...optionalParams);
    this.fileLogger.verbose(message);
  }

  fatal(message: unknown, ...optionalParams: unknown[]) {
    super.fatal(message, ...optionalParams);
    this.fileLogger.fatal(message);
  }
}
