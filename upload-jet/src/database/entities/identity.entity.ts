import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export default class Identity {
  @PrimaryKey()
  id: number;

  @Property()
  username: string;

  @Property()
  githubId: number;

  @Property()
  email: string;
}
