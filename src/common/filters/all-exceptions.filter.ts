import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from '../logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(LoggingService) private readonly logger: LoggingService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const body = this.createErrorResponse(exception, req.url);

    this.logger.error(
      `[RESPONSE] Client: ${req.ip} | ${req.method} ${req.originalUrl} | Status code: ${body.statusCode} | Error: ${body.error} | Message: ${body.message}`,
    );

    res.status(body.statusCode).json(body);
  }

  private createErrorResponse(exception: unknown, url: string) {
    const defaultBody = {
      message: 'Internal Server Error',
      error: 'Unknown Error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    const meta = {
      timestamp: new Date().toISOString(),
      path: url,
    };

    if (exception instanceof HttpException) {
      const exceptionBody = exception.getResponse();

      return {
        ...(exceptionBody instanceof Object
          ? (exceptionBody as typeof defaultBody)
          : defaultBody),
        ...meta,
      };
    }

    return {
      ...defaultBody,
      ...meta,
    };
  }
}
