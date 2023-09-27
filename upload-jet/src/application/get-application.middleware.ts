import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  NotFoundException
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import {
  ApplicationNotFoundError,
  ApplicationService
} from './application.service';
import { hasPermission } from 'shared/auth/authorization';
import { readApplicationSchema } from './validation';

@Injectable()
export class GetApplicationMiddleware implements NestMiddleware {
  constructor(private readonly applicationService: ApplicationService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const { id: applicationId } = await readApplicationSchema.parseAsync({
      id: req.params['applicationId']
    });

    try {
      const application = await this.applicationService.getById(applicationId);

      if (!hasPermission(req.permissions, 'update', application)) {
        throw new ForbiddenException();
      }

      req.applicationId = applicationId;
    } catch (error) {
      if (error instanceof ApplicationNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }

    next();
  }
}
