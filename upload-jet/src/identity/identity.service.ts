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

// TODO: Remove below type after we implement roles in database and use User class from above to infer type
import { TemporaryUserType } from './identity.types';

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

  async hydrateUser(user: UserProfile): Promise<TemporaryUserType> {
    const identity = this.mapUser(user);
    this.upsert(identity);

    //TODO: 'return identity' with a type of User instead of MockedUser after we insert a role for the user in the database
    const MockedUser: TemporaryUserType = {
      id: 1,
      githubId: 1,
      email: 'mocked.user1@gmail.com',
      role: 'User',
      avatarUrl: 'someURL',
      createdAt: new Date('2022-03-15T09:30:00Z'),
      updatedAt: new Date('2022-03-15T09:30:00Z')
    };
    return MockedUser;
  }

  private mapUser(user: GetUserResult): User {
    return new User(user.id, user.email, user.avatarUrl);
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

  async generateAccessToken(payload: JWTPayload): Promise<string> {
    return this.jwtService.signAsync(payload, JWT_OPTIONS);
  }
}
