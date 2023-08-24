import { z } from 'zod';

const expiresInType = z.union([z.string(), z.number(), z.undefined()]);

const expiresInSchema = z
  .object({
    expiresIn: expiresInType
  })
  .strict();

const expiresInOption = { expiresIn: '3600s' };

export const expiresIn = expiresInSchema.parse(expiresInOption);
