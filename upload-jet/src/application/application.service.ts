import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import Application from './application.entity';

export class ApplicationNotFoundError extends Error {
  constructor() {
    super('Application not found');
    this.name = this.constructor.name;
  }
}

export class ApiKeyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

@Injectable()
export class ApplicationService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Application)
    private readonly applicationRepository: EntityRepository<Application>
  ) {}

  getAllByUserId(userId: number) {
    return this.applicationRepository.find(
      { userId },
      { fields: ['*', { apiKeys: ['id'] }] }
    );
  }

  async getById(id: number) {
    const result = await this.applicationRepository.findOne(
      { id },
      { fields: ['*', { apiKeys: ['id'] }] }
    );
    if (!result) throw new ApplicationNotFoundError();
    return result;
  }

  async generateApiKey(application: Application) {
    const apiKey = await application.generateApiKey();
    await this.em.persistAndFlush(application);
    return apiKey;
  }

  async deleteApiKey(application: Application) {
    await application.deleteApiKey();
    this.em.persistAndFlush(application);
  }
}
