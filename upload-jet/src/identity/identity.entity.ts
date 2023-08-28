import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export default class Identity {
  @PrimaryKey()
  id: number;

  @Property()
  email: string;

  @Property()
  avatarUrl: string;
}
