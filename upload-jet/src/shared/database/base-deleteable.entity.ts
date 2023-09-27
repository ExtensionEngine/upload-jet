import { Property } from '@mikro-orm/core';
import BaseEntity from './base.entity';

abstract class BaseDeleteableEntity extends BaseEntity {
  @Property({ nullable: true })
  deletedAt: Date = null;
}

export default BaseDeleteableEntity;
