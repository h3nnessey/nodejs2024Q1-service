import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status, body } = this.createErrorResponse(exception, request.url);

    response.status(status).json(body);
  }

  private createErrorResponse(exception: unknown, url: string) {
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    const defaultBody = {
      message: 'Internal Server Error',
      error: 'Unknown Error',
      statusCode: status,
    };

    const meta = {
      timestamp: new Date().toISOString(),
      path: url,
    };

    if (exception instanceof HttpException) {
      const exceptionBody = exception.getResponse();

      return {
        status: exception.getStatus(),
        body: {
          ...(exceptionBody instanceof Object ? exceptionBody : defaultBody),
          ...meta,
        },
      };
    }

    return {
      status,
      body: {
        ...defaultBody,
        ...meta,
      },
    };
  }
}
