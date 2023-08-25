import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const appSchema = z.object({
  port: z.coerce.number().default(3000),
  appUrl: z.string().nonempty()
});

export default registerAs('app', () => {
  const config = appSchema.parse({
    port: process.env.PORT,
    appUrl: process.env.APP_URL
  });
  return config;
});
