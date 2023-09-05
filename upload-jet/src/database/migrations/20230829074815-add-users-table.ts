import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'user';

export class AddUser extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createUserTable = knex.schema.createTable(TABLE_NAME, table => {
      table.increments('id').primary();
      table.integer('github_id').notNullable().unique();
      table.string('email').notNullable();
      table.string('avatar_url').notNullable();
      table
        .timestamp('created_at', { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now());
      table
        .timestamp('updated_at', { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now());
    });

    this.addSql(createUserTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(knex.schema.dropTable(TABLE_NAME).toQuery());
  }
}
