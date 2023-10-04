import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'api_key';
const COLUMN_NAME = 'application_id';

export class ApplicationIdNullable extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const schema = knex.schema.alterTable(TABLE_NAME, table => {
      table.integer(COLUMN_NAME).nullable().alter();
    });

    this.addSql(schema.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    const schema = knex.schema.alterTable(TABLE_NAME, table => {
      table.integer(COLUMN_NAME).notNullable().alter();
    });

    this.addSql(schema.toQuery());
  }
}
