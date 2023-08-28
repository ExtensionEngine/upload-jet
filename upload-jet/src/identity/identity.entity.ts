import { Entity, Property, Unique } from '@mikro-orm/core';
import BaseEntity from '../shared/database/base.entity';

@Entity({ tableName: 'user' })
export default class Identity extends BaseEntity {
  @Unique()
  @Property()
  githubId: number;

  @Unique()
  @Property()
  email: string;

  @Property()
  avatarUrl: string;

  constructor(githubId: number, email: string, avatarUrl: string) {
    super();
    this.id = githubId;
    this.email = email;
    this.avatarUrl = avatarUrl;
  }
}
