import {
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique
} from '@mikro-orm/core';
import BaseEntity from '../shared/database/base.entity';
import ApiKey from './api-key.entity';
import { createHash, randomUUID } from 'crypto';

export class ApiKeyExistsError extends Error {
  constructor() {
    super('Api key already exists for this application');
    this.name = this.constructor.name;
  }
}

@Entity()
@Unique({ properties: ['name', 'userId'] })
export default class Application extends BaseEntity {
  @Property({ nullable: false })
  name: string;

  @Property({ fieldName: 'user_id', serializedName: 'userId' })
  userId!: number;

  @OneToMany(() => ApiKey, apiKey => apiKey.application, { eager: true })
  apiKeys = new Collection<ApiKey>(this);

  constructor(name: string, userId: number) {
    super();
    this.name = name;
    this.userId = userId;
  }

  private apiKeyExists(): boolean {
    const apiKeys = this.apiKeys.getItems();
    return !!apiKeys.find(apiKey => !apiKey.deletedAt);
  }

  private async hashApiKey(apiKey: string): Promise<string> {
    const hash = createHash('sha512');
    hash.update(apiKey);
    return hash.digest('hex');
  }

  async generateApiKey(): Promise<string> {
    if (this.apiKeyExists()) throw new ApiKeyExistsError();
    const apiKey = randomUUID();
    const hashedKey = await this.hashApiKey(apiKey);
    this.apiKeys.add(new ApiKey(hashedKey));
    return apiKey;
  }

  async deleteApiKey(): Promise<void> {
    const apiKeys = await this.apiKeys.loadItems();
    apiKeys.forEach(apiKey => (apiKey.deletedAt = new Date()));
  }
}
