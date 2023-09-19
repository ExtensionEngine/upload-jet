import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import BaseEntity from '../shared/database/base.entity';
import User from '../identity/identity.entity';

@Entity()
@Unique({ properties: ['name', 'user_id'] })
export default class Application extends BaseEntity {
  @Property({ nullable: false })
  name: string;

  @ManyToOne(() => User, { fieldName: 'user_id', serializedName: 'userId' })
  user_id!: number;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
