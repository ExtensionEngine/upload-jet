import { Migration } from '@mikro-orm/migrations';

export class Migration20230828114610 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "identity" ("id" serial primary key, "username" varchar(255) not null, "github_id" int not null, "email" varchar(255) not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "identity" cascade;');
  }

}
