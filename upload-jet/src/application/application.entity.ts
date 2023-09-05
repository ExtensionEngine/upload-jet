import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import BaseEntity from '../shared/database/base.entity';
import User from '../identity/user.entity';

@Entity({ tableName: 'application' })
export default class Application extends BaseEntity {
  @Unique()
  @Property({ nullable: false })
  name: string;

  @ManyToOne({
    entity: () => User,
    serializer: it => it.id,
    fieldName: 'user_id',
    serializedName: 'userId'
  })
  user!: User;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
