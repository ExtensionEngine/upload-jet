import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './jwt.types';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async verifyJwtToken(token: string): Promise<JWTPayload> {
    return this.jwtService.verifyAsync<JWTPayload>(token);
  }
}
