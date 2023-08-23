import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(user: any): Promise<string> {
    const payload = {
      username: user.login,
      email: user.email,
      role: user.role
    };
    return await this.jwtService.signAsync(payload);
  }

  async verifyJwtToken(token) {
    return await this.jwtService.verifyAsync(token);
  }
}
