import { Injectable } from '@nestjs/common';
import { GithubProviderService } from 'identity/github-provider.service';

@Injectable()
export class IdentityService {
  constructor(private readonly githubProvider: GithubProviderService) {}

  async authorize(code: string) {
    const user = await this.githubProvider.getUser(code);
    // TODO: Upsert user to the database
  }
}
