import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import Identity from './identity.entity';
import { GithubProviderService } from 'github/githubProvider.service';

@Injectable()
export class IdentityService {
  constructor(
    private readonly githubProvider: GithubProviderService,
    @InjectRepository(Identity)
    private readonly IdentityRepository: EntityRepository<Identity>
  ) {}

  async authorize(code: string) {
    // TODO: Use this data to verify if user exists in our database
    const user = await this.githubProvider.getUser(code);
  }
}
