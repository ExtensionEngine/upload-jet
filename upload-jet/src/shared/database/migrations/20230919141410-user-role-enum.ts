import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'user';
const COLUMN_NAME = 'role';
const ROLES = ['admin', 'user'];

const TEMP_COLUMN = 'temp';

const COPY_COLUMN_SQL = `
  UPDATE "${TABLE_NAME}"
  SET "${TEMP_COLUMN}" = "${COLUMN_NAME}"
`;

export class UserRoleEnum extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const modifyRole = knex.schema
      .alterTable(TABLE_NAME, table => {
        table.enum(TEMP_COLUMN, ROLES);
      })
      .raw(COPY_COLUMN_SQL)
      .alterTable(TABLE_NAME, table => {
        table.dropColumn(COLUMN_NAME);
        table.renameColumn(TEMP_COLUMN, COLUMN_NAME);
      });

    this.addSql(modifyRole.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    const modifyRole = knex.schema
      .alterTable(TABLE_NAME, table => {
        table.string(TEMP_COLUMN, 256);
      })
      .raw(COPY_COLUMN_SQL)
      .alterTable(TABLE_NAME, table => {
        table.dropColumn(COLUMN_NAME);
        table.renameColumn(TEMP_COLUMN, COLUMN_NAME);
      });

    this.addSql(modifyRole.toQuery());
  }
}
