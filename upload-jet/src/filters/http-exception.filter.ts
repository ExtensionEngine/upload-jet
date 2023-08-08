import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const data = exception.getResponse();

    const responseObject = {
      statusCode: status,
      message: exception.message
    };

    if (data instanceof Object) {
      responseObject['data'] = data;
    }

    response.status(status).json(responseObject);
  }
}
