import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Payload } from './jwt.dto';

const JWT_OPTIONS: JwtSignOptions = { expiresIn: '3600s' };

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(payload: Payload): Promise<string> {
    return this.jwtService.signAsync(payload, JWT_OPTIONS);
  }

  async verifyJwtToken(token: string): Promise<Payload> {
    try {
      const { id, role } = await this.jwtService.verifyAsync(token);
      const payload: Payload = { id, role };
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
