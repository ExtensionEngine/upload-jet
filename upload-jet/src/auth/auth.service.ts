import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './jwt.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(payload: Payload): Promise<string> {
    return this.jwtService.signAsync(payload);
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
