import { Injectable, LoggerService } from '@nestjs/common';
import { resolve } from 'node:path';
import { mkdir, stat, writeFile, rename } from 'node:fs/promises';
import { EOL } from 'node:os';
import { config } from '@/config/env';

@Injectable()
export class FileLoggerService implements LoggerService {
  log(message: unknown) {
    this.writeLog(message);
  }

  error(message: unknown) {
    this.writeErrorLog(message);
  }

  warn(message: unknown) {
    this.writeLog(message);
  }

  debug(message: unknown) {
    this.writeLog(message);
  }

  verbose(message: unknown) {
    this.writeLog(message);
  }

  fatal(message: unknown) {
    this.writeErrorLog(message);
  }

  private async writeLog(message: unknown) {
    await this.write({ type: 'common', message });
  }

  private async writeErrorLog(message: unknown) {
    await this.write({ type: 'error', message });
  }

  private async write({
    type,
    message,
  }: {
    type: 'common' | 'error';
    message: unknown;
  }) {
    const logsPath = resolve(config.logs.dir);
    const logFilePath = resolve(config.logs.dir, `${type}-logs.current.txt`);

    try {
      await mkdir(logsPath, { recursive: true });

      const shouldRotate = await this.shouldRotate(logFilePath);

      if (shouldRotate) {
        const newFilePath = resolve(logsPath, `${Date.now()}_${type}-logs.txt`);

        await rename(logFilePath, newFilePath);
      }

      await writeFile(logFilePath, this.createLogMessage(message), {
        encoding: 'utf-8',
        flag: 'a',
      });
    } catch (error) {
      console.error(error);
    }
  }

  private async shouldRotate(path: string) {
    try {
      const stats = await stat(path);

      return stats.size / 1024 >= config.logs.fileSize;
    } catch {
      return false;
    }
  }

  private createLogMessage(message: unknown) {
    return `${new Date().toISOString()} ${JSON.stringify(message)}${EOL}`;
  }
}
