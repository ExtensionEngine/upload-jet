import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import BaseEntity from '../shared/database/base.entity';
import Identity from '../identity/identity.entity';

@Entity()
@Unique({ properties: ['name', 'user'] })
export default class Application extends BaseEntity {
  @Property({ nullable: false })
  name: string;

  @ManyToOne(() => Identity, { fieldName: 'user_id', serializedName: 'userId' })
  user!: Identity;

  @Property({ persist: false })
  userId!: number;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
