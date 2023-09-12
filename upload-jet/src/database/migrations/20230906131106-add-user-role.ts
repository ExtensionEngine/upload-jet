import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'user';
const COLUMN_NAME = 'role';
const ROLES = ['admin', 'user'];

export class AddRole extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const addRole = knex.schema.table(TABLE_NAME, table => {
      table.enum(COLUMN_NAME, ROLES);
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
