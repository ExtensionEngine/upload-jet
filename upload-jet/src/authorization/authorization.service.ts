import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './jwt.types';

@Injectable()
export class AuthorizationService {
  constructor(private readonly jwtService: JwtService) {}

  async verifyJwtToken(token: string): Promise<Payload> {
    return this.jwtService.verifyAsync<Payload>(token);
  }
}
