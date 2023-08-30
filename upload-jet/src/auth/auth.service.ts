import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './jwt.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async verifyJwtToken(token: string): Promise<Payload> {
    const { id, role } = await this.jwtService.verifyAsync(token);
    const payload: Payload = { id, role };
    return payload;
  }
}
