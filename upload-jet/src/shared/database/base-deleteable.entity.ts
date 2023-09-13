import { Property } from '@mikro-orm/core';
import BaseEntity from './base.entity';

abstract class BaseDeleteableEntity extends BaseEntity {
  @Property()
  deletedAt: Date = new Date();
}

export default BaseDeleteableEntity;
