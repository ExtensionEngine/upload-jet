import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'api-key';

export class Migration20230913064321 extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createApplicationTable = knex.schema.createTable(
      TABLE_NAME,
      table => {
        table.increments('id').primary();
        table.string('key', 32).notNullable().unique();
        table.integer('application_id').notNullable();
        table
          .foreign('application_id')
          .references('application.id')
          .onDelete('SET NULL');
        table
          .timestamp('created_at', { useTz: true })
          .notNullable()
          .defaultTo(knex.fn.now());
        table
          .timestamp('updated_at', { useTz: true })
          .notNullable()
          .defaultTo(knex.fn.now());
        table.timestamp('deleted_at', { useTz: true });
      }
    );

    this.addSql(createApplicationTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(knex.schema.dropTable(TABLE_NAME).toQuery());
  }
}
