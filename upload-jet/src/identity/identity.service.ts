import { Injectable } from '@nestjs/common';
import { GithubProviderService } from 'identity/github-provider.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User, JWTPayload, GithubUser } from './identity.types';

const JWT_OPTIONS: JwtSignOptions = { expiresIn: '3600s' };

@Injectable()
export class IdentityService {
  constructor(
    private readonly githubProvider: GithubProviderService,
    private readonly jwtService: JwtService
  ) {}

  async getGithubUser(code: string) {
    return await this.githubProvider.getUser(code);
  }

  async hydrateUser(user: GithubUser): Promise<User> {
    //TODO: Upsert user to the database

    //TODO: Return the user from the database
    const MockedUser: User = {
      id: 1,
      login: 'MockedUser1',
      email: 'mocked.user1@gmail.com',
      role: 'User'
    };
    return MockedUser;
  }

  async generateJwtToken(payload: JWTPayload): Promise<string> {
    return this.jwtService.signAsync(payload, JWT_OPTIONS);
  }
}
