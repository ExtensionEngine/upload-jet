import { Entity, Property, Unique } from '@mikro-orm/core';
import BaseEntity from '../shared/database/base.entity';

@Entity()
@Unique({ properties: ['name', 'userId'] })
export default class Application extends BaseEntity {
  @Property({ nullable: false })
  name: string;

  @Property({ fieldName: 'user_id', serializedName: 'userId' })
  userId!: number;

  constructor(name: string) {
    super();
    this.name = name;
  }
}