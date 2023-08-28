import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const databaseSchema = z.object({
  port: z.coerce.number().default(5432),
  host: z.string().nonempty(),
  dbName: z.string().nonempty(),
  user: z.string().nonempty(),
  password: z.string().nonempty(),
  type: z.string().nonempty(),
  migrations: z.object({
    path: z.string().nonempty(),
    disableForeignKeys: z.boolean().default(false),
    pattern: z.any(),
    fileName: z.function()
  })
});

export default registerAs('database', () => {
  const config = databaseSchema.parse({
    port: parseInt(process.env.POSTGRES_PORT, 10),
    host: process.env.POSTGRES_HOST,
    dbName: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
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
