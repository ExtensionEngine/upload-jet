import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';
import { logger } from '@mikro-orm/nestjs';

const BAD_REQUEST_CODE = 400;

@Catch(ZodError)
export class ZodExceptionFilter implements ExceptionFilter {
  constructor() {}

  mapZodError(error: ZodError) {
    return error.issues.map(({ path, message, code }) => ({
      path,
      message,
      code
    }));
  }

  catch(exception: ZodError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const error = this.mapZodError(exception);
    logger.error(error);

    response.status(BAD_REQUEST_CODE).json({
      statusCode: BAD_REQUEST_CODE,
      message: exception.name,
      error
    });
  }
}
