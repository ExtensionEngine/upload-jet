import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import Identity, { Role } from './identity.entity';
import {
  GetUserResult,
  GithubProviderService
} from 'identity/github-provider.service';
import { JwtService } from '@nestjs/jwt';
import { AuthorizationService } from './authorization.service';

type AccessToken = string;

@Injectable()
export class IdentityService {
  constructor(
    private readonly githubProvider: GithubProviderService,
    private readonly jwtService: JwtService,
    private readonly em: EntityManager,
    private readonly authorizationService: AuthorizationService,
    @InjectRepository(Identity)
    private readonly identityRepository: EntityRepository<Identity>
  ) {}

  async authorize(code: string): Promise<AccessToken> {
    const user = await this.githubProvider.getUser(code);
    const identity = await this.upsertIdentity(user);
    const permissions = await this.authorizationService.getPermissions(
      identity
    );
    const accessToken = await this.jwtService.signAsync(
      { permissions },
      { subject: String(identity.id) }
    );
    return accessToken;
  }

  get(id: number): Promise<Identity> {
    return this.identityRepository.findOne(id);
  }

  private async upsertIdentity(user: GetUserResult): Promise<Identity> {
    // TODO: Rename githubId to ssoId and make it string instead of number
    const existingIdentity = await this.identityRepository.findOne({
      githubId: user.id
    });
    if (existingIdentity) {
      existingIdentity.email = user.email;
      existingIdentity.avatarUrl = user.avatarUrl;
      await this.em.flush();
      return existingIdentity;
    }
    const identity = new Identity(
      user.id,
      user.email,
      user.avatarUrl,
      Role.USER
    );
    await this.em.persistAndFlush(identity);
    return identity;
  }
}
