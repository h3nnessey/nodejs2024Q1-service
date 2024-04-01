import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
import { LoggingService } from '../logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(LoggingService) private readonly logger: LoggingService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    this.logger.log(
      `[REQUEST] Client: ${req.ip} |  ${req.method} ${req.url} | Query: ${JSON.stringify(req.query)} | Body: ${JSON.stringify(req.body)}`,
    );

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `[RESPONSE] Client: ${req.ip} | ${req.method} ${req.originalUrl} | Status code: ${res.statusCode}`,
        );
      }),
    );
  }
}
