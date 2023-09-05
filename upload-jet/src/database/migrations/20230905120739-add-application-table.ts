import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'application';

export class AddApplication extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createApplicationTable = knex.schema.createTable(
      TABLE_NAME,
      table => {
        table.increments('id').primary();
        table.string('name').notNullable().unique();
        table.integer('user_id').notNullable();
        table.foreign('user_id').references('user.id').onDelete('SET NULL');
        table
          .timestamp('created_at', { useTz: true })
          .notNullable()
          .defaultTo(knex.fn.now());
        table
          .timestamp('updated_at', { useTz: true })
          .notNullable()
          .defaultTo(knex.fn.now());
      }
    );

    this.addSql(createApplicationTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(knex.schema.dropTable(TABLE_NAME).toQuery());
  }
}
