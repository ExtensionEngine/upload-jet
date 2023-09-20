import { BadRequestException, Injectable } from '@nestjs/common';
import ApiKey from './api-key.entity';
import { EntityManager } from '@mikro-orm/core';
import Application from './application.entity';
import { randomUUID, createHash } from 'crypto';

@Injectable()
export class ApiKeyService {
  constructor(private readonly em: EntityManager) {}

  private async hashApiKey(apiKey: string): Promise<string> {
    const hash = createHash('sha512');
    hash.update(apiKey);
    return hash.digest('hex');
  }

  apiKeyExists(application: Application): boolean {
    const apiKeys = application.apiKeys.getItems();
    return !!apiKeys.find(apiKey => !apiKey.deletedAt);
  }

  async generateApiKey(application: Application): Promise<string> {
    await application.apiKeys.init();

    const apiKeyExists = this.apiKeyExists(application);
    if (apiKeyExists)
      throw new BadRequestException({
        message: 'Api key already exists for this application'
      });

    const apiKey = randomUUID();
    const hashedKey = await this.hashApiKey(apiKey);

    application.apiKeys.add(new ApiKey(hashedKey));

    this.em.persistAndFlush(application);

    return apiKey;
  }

  async deleteApiKey(application: Application): Promise<void> {
    await application.apiKeys.init();

    const apiKeys = await application.apiKeys.loadItems();
    apiKeys.forEach(apiKey => (apiKey.deletedAt = new Date()));

    this.em.persistAndFlush(application);
  }
}
