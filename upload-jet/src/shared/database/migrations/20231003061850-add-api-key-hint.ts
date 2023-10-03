import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'api_key';
const COLUMN_NAME = 'key_hint';

export class AddApiKeyHint extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const addRole = knex.schema.table(TABLE_NAME, table => {
      table.string(COLUMN_NAME, 256);
    });
    this.addSql(addRole.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();
    const query = knex.schema.table(TABLE_NAME, table => {
      table.dropColumn(COLUMN_NAME);
    });

    this.addSql(query.toQuery());
  }
}
