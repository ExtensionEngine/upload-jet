import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userType } from './auth.types';
import { adminPermission, userPermission } from 'config/permission.config';
import { Payload } from './jwt.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(user: userType): Promise<string> {
    const payload: Payload = {
      id: user.id,
      permissions: user.role === 'Admin' ? adminPermission : userPermission
    };

    return this.jwtService.signAsync(payload);
  }

  async verifyJwtToken(token: string): Promise<Payload> {
    try {
      const { id, permissions } = await this.jwtService.verifyAsync(token);
      const payload: Payload = { id, permissions };
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
