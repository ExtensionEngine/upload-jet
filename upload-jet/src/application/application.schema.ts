import { z } from 'zod';

export const readApplicationSchema = z
  .object({
    id: z.coerce.number().positive()
  })
  .strict();

export type ReadApplicationSchema = z.infer<typeof readApplicationSchema>;
