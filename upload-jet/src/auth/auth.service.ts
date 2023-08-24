import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userType } from './auth.dto';
import { adminPermission, userPermission } from 'config/permission.config';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(user: userType): Promise<string> {
    const payload = {
      username: user.login,
      email: user.email,
      permission: user.role === 'Admin' ? adminPermission : userPermission
    };

    return await this.jwtService.signAsync(payload);
  }

  async verifyJwtToken(token) {
    return await this.jwtService.verifyAsync(token);
  }
}
