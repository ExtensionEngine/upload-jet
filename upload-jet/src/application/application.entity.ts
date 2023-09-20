import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
  Unique
} from '@mikro-orm/core';
import BaseEntity from '../shared/database/base.entity';
import Identity from '../identity/identity.entity';
import ApiKey from './api-key.entity';
@Entity()
@Unique({ properties: ['name', 'user'] })
export default class Application extends BaseEntity {
  @Property({ nullable: false })
  name: string;

  @ManyToOne(() => Identity, { fieldName: 'user_id', serializedName: 'userId' })
  user!: Identity;

  @Property({ persist: false })
  userId!: number;

  @OneToMany(() => ApiKey, apiKey => apiKey.application)
  apiKeys = new Collection<ApiKey>(this);

  constructor(name: string) {
    super();
    this.name = name;
  }
}
