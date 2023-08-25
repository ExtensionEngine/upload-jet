import { MikroORM } from '@mikro-orm/core';

export default {
  entities: ['./src/database/entities/**.ts'],
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './src/database/migrations',
    transactional: true
  },
  dbName: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  type: 'postgresql',
  autoLoadEntities: true
} as Parameters<typeof MikroORM.init>[0];
