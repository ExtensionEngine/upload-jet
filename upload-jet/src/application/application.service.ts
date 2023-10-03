import {
  EntityManager,
  EntityRepository,
  Loaded,
  UniqueConstraintViolationException
} from '@mikro-orm/core';
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

export class UniqueConstraintError extends Error {
  constructor() {
    super('Application with the same name already exists');
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

  async createApplication(name: string, userId: number) {
    try {
      const application = new Application(name, userId);
      await this.em.persistAndFlush(application);
      return application;
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException) {
        throw new UniqueConstraintError();
      }
      throw error;
    }
  }

  async deleteApplication(application: Loaded<Application, never>) {
    await this.em.remove(application).flush();
  }

  async createApiKey(applicationId: number) {
    const apiKey = randomUUID();
    const hashedKey = this.hashApiKey(apiKey);
    const keyHint = this.createKeyHint(apiKey);

    const application = await this.getById(applicationId);
    application.createApiKey(hashedKey, keyHint);
    await this.em.persistAndFlush(application);

    return apiKey;
  }

  async deleteApiKey(applicationId: number) {
    const application = await this.getById(applicationId);
    application.deleteApiKey();
    this.em.persistAndFlush(application);
  }

  private createKeyHint(apiKey: string): string {
    return apiKey
      .split('')
      .map((el, index) => {
        return index > 3 && el !== '-' ? '*' : el;
      })
      .join('');
  }

  private hashApiKey(apiKey: string): string {
    const hash = createHash('sha512');
    hash.update(apiKey);
    return hash.digest('hex');
  }

  async isValidApiKey(apiKey: string): Promise<boolean> {
    const keyHash = this.hashApiKey(apiKey);
    const apiKeyResult = await this.apiKeyRepository.findOne({
      keyHash,
      deletedAt: null
    });
    return Boolean(apiKeyResult);
  }
}
