import { Entity, Property, Unique, r } from '@mikro-orm/core';
import BaseEntity from '../shared/database/base.entity';

@Entity({ tableName: 'user' })
export default class Identity extends BaseEntity {
  @Unique()
  @Property({ nullable: false })
  githubId: number;

  @Property()
  email: string;

  @Property()
  avatarUrl: string;

  constructor(githubId: number, email: string, avatarUrl: string) {
    super();
    this.githubId = githubId;
    this.email = email;
    this.avatarUrl = avatarUrl;
  }
}
