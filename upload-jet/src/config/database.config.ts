import { registerAs } from '@nestjs/config';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { z } from 'zod';
import { join } from 'node:path';

const databaseSchema = z.object({
  port: z.coerce.number().default(5432),
  host: z.string().nonempty(),
  dbName: z.string().nonempty(),
  user: z.string().nonempty(),
  password: z.string().nonempty()
});

export default registerAs('database', () => {
  const config = databaseSchema.parse({
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    dbName: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
  });

  return {
    ...config,
    driver: PostgreSqlDriver,
    migrations: {
      path: join(process.cwd(), 'src/shared/database/migrations'),
      pattern: /^\d+[\w-]+\.ts$/,
      fileName: (timestamp: string) => `${timestamp}-new-migration`
    }
  };
});
