import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['jwt'];
    const user = await this.authService.verifyJwtToken(token);

    if (user) {
      req['user'] = user;
    }

    next();
  }
}
