import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { filterResponseParser } from './dto/filter-response-dto';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = filterResponseParser(
      httpStatus,
      '서버 에러 발생',
      null,
      httpAdapter.getRequestUrl(ctx.getRequest()),
    );

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
