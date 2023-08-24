import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userType } from './auth.dto';
import { adminPermission, userPermission } from 'config/permission.config';
import { payloadType } from './jwt.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(user: userType): Promise<string> {
    const payload: payloadType = {
      username: user.login,
      email: user.email,
      permission: user.role === 'Admin' ? adminPermission : userPermission
    };

    return await this.jwtService.signAsync(payload);
  }

  async verifyJwtToken(token: string): Promise<payloadType> {
    try {
      const { username, email, permission } = await this.jwtService.verifyAsync(
        token
      );
      const payload: payloadType = { username, email, permission };
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
