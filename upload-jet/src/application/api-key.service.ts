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

  async generateApiKey(application: Application): Promise<string> {
    const apiKey = randomUUID();
    const hashedKey = await this.hashApiKey(apiKey);

    this.apiKeyRepository.nativeUpdate(
      { application: application.id },
      { deletedAt: new Date() }
    );

    const apiKeyEntity = new ApiKey(hashedKey, application);
    this.em.persist(apiKeyEntity);

    this.em.flush();

    return apiKey;
  }
}
