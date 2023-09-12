import { unpackRules } from '@casl/ability/extra';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { accessToken } = req.cookies;
    if (!accessToken) throw new UnauthorizedException('No access token found');
    try {
      const { permissions, sub } = await this.jwtService.verifyAsync(
        accessToken
      );
      req.userId = Number(sub);
      req.permissions = unpackRules(permissions);
      next();
    } catch (error) {
      if (
        error?.name === 'JsonWebTokenError' ||
        error?.name === 'TokenExpiredError'
      ) {
        throw new UnauthorizedException('Token is not valid');
      }
      next(error);
    }
  }
}
