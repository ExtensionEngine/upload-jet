import { registerAs } from '@nestjs/config';
import { z } from 'zod';
import { jwtOptions } from './jwt.config';

const appSchema = z.object({
  port: z.coerce.number().default(3000),
  jwt: z.object({
    secret: z.string().nonempty(),
    jwtOptions: z
      .object({
        expiresIn: z.string()
      })
      .optional()
  })
});

export default registerAs('app', () => {
  const config = appSchema.parse({
    port: process.env.PORT,
    jwt: {
      secret: process.env.JWT_SECRET,
      jwtOptions: jwtOptions
    }
  });
  return config;
});
