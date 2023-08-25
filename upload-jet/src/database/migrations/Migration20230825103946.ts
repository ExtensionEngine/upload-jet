import { Migration } from '@mikro-orm/migrations';

export class Migration20230825103946 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "identity_entity" ("id" serial primary key, "username" varchar(255) not null, "github_id" int not null, "email" varchar(255) not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "identity_entity" cascade;');
  }

}
