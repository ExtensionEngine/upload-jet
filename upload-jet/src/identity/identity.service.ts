import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import Identity from './identity.entity';
import {
  GetUserResult,
  GithubProviderService
} from 'identity/github-provider.service';

@Injectable()
export class IdentityService {
  constructor(
    private readonly em: EntityManager,
    private readonly githubProvider: GithubProviderService,
    @InjectRepository(Identity)
    private readonly identityRepository: EntityRepository<Identity>
  ) {}

  async authorize(code: string) {
    const user = await this.githubProvider.getUser(code);

    if (user) {
      const identityEntity = this.mapUser(user);
      this.upsert(identityEntity);
    }
  }

  mapUser(user: GetUserResult): Identity {
    return new Identity(user.id, user.email, user.avatarUrl);
  }

  async upsert(user: Identity): Promise<void> {
    const existingUser = await this.identityRepository.findOne({
      githubId: user.githubId
    });

    if (existingUser) {
      existingUser.email = user.email;
      existingUser.avatarUrl = user.avatarUrl;
    } else {
      this.em.persist(user);
    }

    await this.em.flush();
  }
}
