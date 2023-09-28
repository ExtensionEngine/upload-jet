import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import Application from './application.entity';
import { createHash, randomUUID } from 'crypto';
import ApiKey from './api-key.entity';

export class ApplicationNotFoundError extends Error {
  constructor() {
    super('Application not found');
    this.name = this.constructor.name;
  }
}

@Injectable()
export class ApplicationService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Application)
    private readonly applicationRepository: EntityRepository<Application>,
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: EntityRepository<ApiKey>
  ) {}

  getAllByUserId(userId: number) {
    return this.applicationRepository.find({ userId });
  }

  async getById(id: number) {
    const result = await this.applicationRepository.findOne({ id });
    if (!result) throw new ApplicationNotFoundError();
    return result;
  }

  async createApiKey(applicationId: number) {
    const apiKey = randomUUID();
    const hashedKey = this.hashApiKey(apiKey);

    const application = await this.getById(applicationId);
    application.createApiKey(hashedKey);
    await this.em.persistAndFlush(application);

    return apiKey;
  }

  async deleteApiKey(applicationId: number) {
    const application = await this.getById(applicationId);
    application.deleteApiKey();
    this.em.persistAndFlush(application);
  }

  private hashApiKey(apiKey: string): string {
    const hash = createHash('sha512');
    hash.update(apiKey);
    return hash.digest('hex');
  }

  async isValidApiKey(apiKey: string): Promise<boolean> {
    const keyHash = this.hashApiKey(apiKey);
    console.log('KEY HASH', apiKey, keyHash);
    return !!(await this.apiKeyRepository.findOne({ keyHash }));
  }
}
