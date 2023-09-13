import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import ApiKey from './api-key.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import Application from './application.entity';

@Injectable()
export class ApiKeyService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: EntityRepository<ApiKey>
  ) {}

  private async hashApiKey(apiKey: string): Promise<string> {
    const salt = await genSalt();
    const hashedApiKey = await hash(apiKey, salt);
    return hashedApiKey;
  }

  private generateRandomKey = (length: number): string => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const characterArray = new Uint8Array(length);
    crypto.getRandomValues(characterArray);
    let apiKey = '';
    characterArray.forEach(index => {
      apiKey += characters[index % characters.length];
    });
    return apiKey;
  };

  async generateApiKey(application: Application): Promise<string> {
    const apiKey = this.generateRandomKey(32);
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
