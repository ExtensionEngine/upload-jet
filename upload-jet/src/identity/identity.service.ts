import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import User from './user.entity';
import {
  GetUserResult,
  GithubProviderService
} from 'identity/github-provider.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { JWTPayload, UserProfile } from './identity.types';

const JWT_OPTIONS: JwtSignOptions = { expiresIn: '3600s' };

@Injectable()
export class IdentityService {
  constructor(
    private readonly githubProvider: GithubProviderService,
    private readonly jwtService: JwtService,
    private readonly em: EntityManager,
    @InjectRepository(User)
    private readonly identityRepository: EntityRepository<User>
  ) {}

  async getUserProfile(code: string) {
    return this.githubProvider.getUser(code);
  }

  async hydrateUser(user: UserProfile): Promise<User> {
    const identity = this.mapUser(user);
    return this.upsert(identity);
  }

  private mapUser(user: GetUserResult): User {
    return new User(user.id, user.email, user.avatarUrl);
  }

  async upsert(user: User): Promise<User> {
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
    return existingUser ? existingUser : user;
  }

  async generateAccessToken(payload: JWTPayload): Promise<string> {
    return this.jwtService.signAsync(payload, JWT_OPTIONS);
  }
}
