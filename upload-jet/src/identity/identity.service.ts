import { Injectable } from '@nestjs/common';
import { GithubProviderService } from 'identity/github-provider.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User, Payload } from './identity.types';

const JWT_OPTIONS: JwtSignOptions = { expiresIn: '3600s' };

@Injectable()
export class IdentityService {
  constructor(
    private readonly githubProvider: GithubProviderService,
    private readonly jwtService: JwtService
  ) {}

  async authorize(code: string) {
    //TODO: Upsert user to the database
    const user = await this.githubProvider.getUser(code);

    //TODO: Return the user from the database
    const MockedUser: User = {
      id: 1,
      login: 'MockedUser1',
      email: 'mocked.user1@gmail.com',
      role: 'User'
    };
    return MockedUser;
  }

  async generateJwtToken(payload: Payload): Promise<string> {
    return this.jwtService.signAsync(payload, JWT_OPTIONS);
  }
}
