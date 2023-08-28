import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import Identity from './identity.entity';
import { GithubProviderService } from 'identity/github-provider.service';

@Injectable()
export class IdentityService {
  constructor(
    private readonly githubProvider: GithubProviderService,
    @InjectRepository(Identity)
    private readonly IdentityRepository: EntityRepository<Identity>
  ) {}

  async authorize(code: string) {
    const user = await this.githubProvider.getUser(code);
    // TODO: Upsert user to the database
  }
}
