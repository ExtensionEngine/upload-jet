import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import ApiKey from './api-key.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import Application from './application.entity';
import { randomUUID, createHash } from 'crypto';

@Injectable()
export class ApiKeyService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: EntityRepository<ApiKey>
  ) {}

  private async hashApiKey(apiKey: string): Promise<string> {
    const hash = createHash('sha512');
    hash.update(apiKey);
    return hash.digest('hex');
  }

  async apiKeyExists(applicationId: number): Promise<boolean> {
    const apiKey = await this.apiKeyRepository.findOne({
      application: applicationId,
      deletedAt: null
    });
    return !!apiKey;
  }

  async generateApiKey(application: Application): Promise<string> {
    const apiKey = randomUUID();
    const hashedKey = await this.hashApiKey(apiKey);

    this.em.persist(new ApiKey(hashedKey, application));
    this.em.flush();

    return apiKey;
  }

  async deleteApiKey(applicationId: number): Promise<void> {
    this.apiKeyRepository.nativeUpdate(
      { application: applicationId },
      { deletedAt: new Date() }
    );

    this.em.flush();
  }
}
