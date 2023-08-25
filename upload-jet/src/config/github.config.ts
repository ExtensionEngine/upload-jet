import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const githubSchema = z.object({
  githubClientId: z.string().nonempty(),
  githubSecret: z.string().nonempty()
});

export default registerAs('github', () => {
  const config = githubSchema.parse({
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubSecret: process.env.GITHUB_CLIENT_SECRET
  });
  return config;
});
