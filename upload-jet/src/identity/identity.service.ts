import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import User from './user.entity';
import {
  GetUserResult,
  GithubProviderService
} from 'identity/github-provider.service';

@Injectable()
export class IdentityService {
  constructor(
    private readonly em: EntityManager,
    private readonly githubProvider: GithubProviderService,
    @InjectRepository(User)
    private readonly identityRepository: EntityRepository<User>
  ) {}

  async authorize(code: string) {
    const user = await this.githubProvider.getUser(code);

    if (!user) return;
    const identity = this.mapUser(user);
    this.upsert(identity);
  }

  private mapUser(user: GetUserResult): User {
    const mappedUser = new User(user.id, user.email, user.avatarUrl);
    mappedUser.role = 'User';
    return mappedUser;
  }

  async upsert(user: User): Promise<void> {
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
