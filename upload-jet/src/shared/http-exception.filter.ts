import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';
import { ValidationService } from './validation.service';
import { logger } from '@mikro-orm/nestjs';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly validationService: ValidationService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const responseObj: any = {
      statusCode: status,
      message: exception.name
    };

    if (exceptionResponse instanceof ZodError) {
      const error = this.validationService.mapZodError(exceptionResponse);
      logger.error(error);
      responseObj.error = error;
    }

    response.status(status).json(responseObj);
  }
}
