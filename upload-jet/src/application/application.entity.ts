import { Entity, Property, Unique } from '@mikro-orm/core';
import BaseEntity from '../shared/database/base.entity';

@Entity()
@Unique({ properties: ['name', 'userId'] })
export default class Application extends BaseEntity {
  @Property({ nullable: false })
  name: string;

  @Property()
  userId!: number;

  constructor(name: string, userId: number) {
    super();
    this.name = name;
    this.userId = userId;
  }
}
