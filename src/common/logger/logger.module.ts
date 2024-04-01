import { Module } from '@nestjs/common';
import { LoggingService } from './logger.service';
import { FileLoggerModule } from '../file-logger/file-logger.module';

@Module({
  providers: [LoggingService],
  exports: [LoggingService],
  imports: [FileLoggerModule],
})
export class LoggingModule {}
