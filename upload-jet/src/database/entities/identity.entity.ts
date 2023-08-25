import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
class IdentityEntity {
  @PrimaryKey()
  id: number;

  @Property()
  username: string;

  @Property()
  githubId: number;

  @Property()
  email: string;
}

export default IdentityEntity;
