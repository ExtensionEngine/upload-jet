import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { user, permissions } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(user: user): Promise<string> {
    const adminPermission: permissions[] = [
      'CreateApp',
      'DeleteApp',
      'GetAllUsers'
    ];
    const userPermission: permissions[] = ['CreateApp'];

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
