import { Migration } from '@mikro-orm/migrations';

export class Migration20230828121038 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "github_id" int not null, "email" varchar(255) not null, "avatar_url" varchar(255) not null);');
    this.addSql('alter table "user" add constraint "user_github_id_unique" unique ("github_id");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }

}
