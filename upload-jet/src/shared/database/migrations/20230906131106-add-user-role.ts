import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'user';
const COLUMN_NAME = 'role';

export class AddRole extends Migration {
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
