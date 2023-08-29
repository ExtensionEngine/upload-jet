import {
  Injectable,
  NestMiddleware,
  UnauthorizedException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, NextFunction } from 'express';
import { Payload } from './jwt.dto';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res, next: NextFunction) {
    const token: string = req.cookies['jwt'];

    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const user: Payload = await this.authService.verifyJwtToken(token);
      if (!user) throw new UnauthorizedException('No user found');
      req['user'] = user;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid Token');
      }
      throw new UnauthorizedException(error);
    }
  }
}
