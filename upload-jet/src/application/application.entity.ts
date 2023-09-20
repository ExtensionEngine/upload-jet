import {
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique
} from '@mikro-orm/core';
import BaseEntity from '../shared/database/base.entity';
import ApiKey from './api-key.entity';
@Entity()
@Unique({ properties: ['name', 'userId'] })
export default class Application extends BaseEntity {
  @Property({ nullable: false })
  name: string;

  @Property({ fieldName: 'user_id', serializedName: 'userId' })
  userId!: number;

  @OneToMany(() => ApiKey, apiKey => apiKey.application)
  apiKeys = new Collection<ApiKey>(this);

  constructor(name: string, userId: number) {
    super();
    this.name = name;
    this.userId = userId;
  }
}
