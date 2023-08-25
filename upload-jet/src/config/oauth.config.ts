import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const oauthSchema = z.object({
  clientId: z.string().nonempty(),
  clientSecret: z.string().nonempty()
});

export default registerAs('oauth', () => {
  const config = oauthSchema.parse({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  });
  return config;
});
