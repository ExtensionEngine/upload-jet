import { Entity, Enum, Property, Unique } from '@mikro-orm/core';
import BaseEntity from '../shared/database/base.entity';

@Entity({ tableName: 'user' })
export default class User extends BaseEntity {
  @Unique()
  @Property({ nullable: false })
  githubId: number;

  @Property()
  email: string;

  @Property()
  avatarUrl: string;

  @Enum(() => Role)
  role: Role;

  constructor(githubId: number, email: string, avatarUrl: string) {
    super();
    this.githubId = githubId;
    this.email = email;
    this.avatarUrl = avatarUrl;
  }
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user'
}
