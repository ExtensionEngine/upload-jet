import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { PinoLogger } from 'nestjs-pino';
import { ZodError } from 'zod';

const BAD_REQUEST_CODE = 400;

@Catch(ZodError)
export class ZodExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {}

  mapZodError(error: ZodError) {
    return error.issues.map(({ path, message, code }) => ({
      path,
      message,
      code
    }));
  }

  catch(exception: ZodError, host: ArgumentsHost) {
    const error = this.mapZodError(exception);
    this.logger.error(error);

    const contextType = host.getType();
    if (contextType !== 'http') return;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(BAD_REQUEST_CODE).json({
      statusCode: BAD_REQUEST_CODE,
      message: exception.name,
      error
    });
  }
}
