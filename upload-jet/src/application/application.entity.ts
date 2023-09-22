import {
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique
} from '@mikro-orm/core';
import BaseEntity from '../shared/database/base.entity';
import ApiKey from './api-key.entity';
import { Exclude, Expose } from 'class-transformer';

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

  @Exclude()
  @OneToMany(() => ApiKey, apiKey => apiKey.application, { eager: true })
  apiKeys = new Collection<ApiKey>(this);

  @Property({ persist: false })
  @Expose()
  get hasApiKey(): boolean {
    const apiKeys = this.apiKeys.getItems();
    return !!apiKeys.find(apiKey => !apiKey.deletedAt);
  }

  constructor(name: string, userId: number) {
    super();
    this.name = name;
    this.userId = userId;
  }

  async generateApiKey(hashedKey: string) {
    if (this.hasApiKey) throw new ApiKeyExistsError();
    this.apiKeys.add(new ApiKey(hashedKey));
  }

  async deleteApiKey(): Promise<void> {
    const apiKeys = await this.apiKeys.loadItems();
    const apiKey = apiKeys.find(apiKey => !apiKey.deletedAt);
    if (apiKey) apiKey.deletedAt = new Date();
  }
}
