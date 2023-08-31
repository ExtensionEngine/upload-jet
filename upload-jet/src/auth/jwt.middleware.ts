import {
  Injectable,
  NestMiddleware,
  UnauthorizedException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, NextFunction } from 'express';
import { JWTPayload } from './jwt.types';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res, next: NextFunction) {
    const token: string = req.cookies['jwt'];

    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const user: JWTPayload = await this.authService.verifyJwtToken(token);
      if (!user) throw new UnauthorizedException('No user found');
      req['user'] = user;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid Token');
      }
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      }
      throw new UnauthorizedException(error);
    }
  }
}