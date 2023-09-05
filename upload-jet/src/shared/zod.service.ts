import { Injectable } from '@nestjs/common';
import { ZodError } from 'zod';

@Injectable()
export class ZodService {
  mapZodError(error: ZodError) {
    return error.issues.map(({ path, message, code }) => ({
      path,
      message,
      code
    }));
  }
}
