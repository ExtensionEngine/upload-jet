import { Migration } from '@mikro-orm/migrations';

export class Migration20230828115153 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "identity" ("id" serial primary key, "email" varchar(255) not null, "avatar_url" varchar(255) not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "identity" cascade;');
  }

}
