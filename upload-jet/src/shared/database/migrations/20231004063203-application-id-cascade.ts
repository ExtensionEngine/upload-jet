import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'api_key';
const COLUMN_NAME = 'application_id';

export class ApplicationIdCascade extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const schema = knex.schema.alterTable(TABLE_NAME, table => {
      table.dropForeign(COLUMN_NAME);
      table
        .foreign(COLUMN_NAME)
        .references('application.id')
        .onDelete('CASCADE');
    });

    this.addSql(schema.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    const schema = knex.schema.alterTable(TABLE_NAME, table => {
      table.dropForeign(COLUMN_NAME);
      table
        .foreign(COLUMN_NAME)
        .references('application.id')
        .onDelete('NO ACTION');
    });

    this.addSql(schema.toQuery());
  }
}
