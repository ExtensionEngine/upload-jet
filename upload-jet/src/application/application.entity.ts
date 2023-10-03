import {
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique
} from '@mikro-orm/core';
import BaseEntity from '../shared/database/base.entity';
import ApiKey from './api-key.entity';

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

  @Property()
  userId!: number;

  @OneToMany(() => ApiKey, apiKey => apiKey.application, {
    eager: true,
    hidden: true
  })
  apiKeys = new Collection<ApiKey>(this);

  @Property({ persist: false })
  get hasApiKey() {
    const apiKeys = this.apiKeys.getItems();
    return apiKeys.some(apiKey => !apiKey.deletedAt);
  }

  constructor(name: string, userId: number) {
    super();
    this.name = name;
    this.userId = userId;
  }

  createApiKey(hashedKey: string, keyHint: string): void {
    if (this.hasApiKey) throw new ApiKeyExistsError();
    this.apiKeys.add(new ApiKey(hashedKey, keyHint));
  }

  deleteApiKey(): void {
    const apiKey = this.apiKeys.getItems().find(apiKey => !apiKey.deletedAt);
    if (apiKey) apiKey.deletedAt = new Date();
  }
}
