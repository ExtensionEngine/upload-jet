import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import BaseDeleteableEntity from '../shared/database/base-deleteable.entity';
import Application from './application.entity';

@Entity({ tableName: 'api-key' })
export default class ApiKey extends BaseDeleteableEntity {
  @Unique()
  @Property({ nullable: false })
  key: string;

  @ManyToOne({
    entity: () => Application,
    fieldName: 'application_id',
    serializedName: 'applicationId'
  })
  application!: Application;

  constructor(key: string, applicationId: Application) {
    super();
    this.key = key;
    this.application = applicationId;
  }
}
