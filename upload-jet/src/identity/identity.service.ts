import { Injectable } from '@nestjs/common';
import { GithubProviderService } from 'github/githubProvider.service';

@Injectable()
export class IdentityService {
  constructor(private readonly githubProvider: GithubProviderService) {}

  async authorize(code: string) {
    const accessToken = await this.githubProvider.getAccessToken(code);

    if (accessToken) {
      // TODO: Use this data to verify if user exists in our database
      const user = await this.githubProvider.getGithubUser(accessToken);
    }
  }
}
