import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  NotFoundException
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ApplicationNotFoundError } from './application.service';
import { hasPermission } from 'shared/auth/authorization';
import { readApplicationSchema } from './validation';
import { MikroORM } from '@mikro-orm/core';
import Application from './application.entity';

@Injectable()
export class GetApplicationMiddleware implements NestMiddleware {
  constructor(private readonly orm: MikroORM) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const { id: applicationId } = await readApplicationSchema.parseAsync({
      id: req.body.applicationId
    });

    if (applicationId) {
      try {
        const em = this.orm.em.fork();
        const application = await em.findOne(Application, {
          id: applicationId
        });

        if (!application) throw new ApplicationNotFoundError();

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
    }

    next();
  }
}
