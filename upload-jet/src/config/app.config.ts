import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const appSchema = z.object({
  port: z.coerce.number().default(3000),
  jwt: z.object({
    secret: z.string().nonempty(),
    jwtOptions: z
      .object({
        expiresIn: z.string()
      })
      .optional()
  }),
  appUrl: z.string().nonempty()
});

export default registerAs('app', () => {
  const config = appSchema.parse({
    port: process.env.PORT,
    jwt: {
      secret: process.env.JWT_SECRET
    },
    appUrl: process.env.APP_URL
  });
  return config;
});
