import {
  Injectable,
  NestMiddleware,
  UnauthorizedException
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ApplicationService } from './application.service';

@Injectable()
export class ApiKeyValidationMiddleware implements NestMiddleware {
  constructor(private readonly applicationService: ApplicationService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    const [name, apiKey] = authHeader?.split(' ') || '';
    if (name !== 'Bearer' || !apiKey) {
      throw new UnauthorizedException('Incorrect authorization schema');
    }

    const isValidApiKey = await this.applicationService.isValidApiKey(apiKey);

    if (!isValidApiKey) throw new UnauthorizedException('Api key is not valid');

    next();
  }
}
