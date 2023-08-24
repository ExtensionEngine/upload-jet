import {
  Injectable,
  NestMiddleware,
  UnauthorizedException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res, next: NextFunction) {
    const token = req.cookies['jwt'];

    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const user = await this.authService.verifyJwtToken(token);
      if (!user) throw new UnauthorizedException('No user found');
      req['user'] = user;
      next();
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
