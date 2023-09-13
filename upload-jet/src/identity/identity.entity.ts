import { Entity, Enum, Property, Unique } from '@mikro-orm/core';
import BaseEntity from '../shared/database/base.entity';
import { Role, Roles } from '../auth/auth.types';

export const Role = {
  ADMIN: 'admin',
  USER: 'user'
} as const;

export type Role = (typeof Role)[keyof typeof Role];

@Entity({ tableName: 'user' })
export default class Identity extends BaseEntity {
  @Unique()
  @Property({ nullable: false })
  githubId: number;

  @Property()
  email: string;

  @Property()
  avatarUrl: string;

  @Enum({ items: Object.values(Roles) })
  role: Role;

  constructor(
    githubId: number,
    email: string,
    avatarUrl: string,
    role: Role = Role.USER
  ) {
    super();
    this.githubId = githubId;
    this.email = email;
    this.avatarUrl = avatarUrl;
    this.role = role;
  }
}
