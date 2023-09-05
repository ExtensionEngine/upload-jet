import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const databaseSchema = z.object({
  port: z.coerce.number().default(5432),
  host: z.string().nonempty(),
  dbName: z.string().nonempty(),
  user: z.string().nonempty(),
  password: z.string().nonempty(),
  type: z.any(),
  migrations: z.any()
});

export default registerAs('database', () => {
  const config = databaseSchema.parse({
    port: parseInt(process.env.DATABASE_PORT, 10),
    host: process.env.DATABASE_HOST,
    dbName: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    type: 'postgresql',
    migrations: {
      path: `${process.cwd()}/src/database/migrations`,
      disableForeignKeys: false,
      pattern: /^\d+[\w-]+\.ts$/,
      fileName: (timestamp: string) => `${timestamp}-new-migration`
    }
  });
  return config;
});
