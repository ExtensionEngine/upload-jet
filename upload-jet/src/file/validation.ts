import { z } from 'zod';

export const getFileSchema = z
  .object({
    duration: z.coerce.number().positive().lte(604800)
  })
  .strict();

export type GetFileSchema = z.infer<typeof getFileSchema>;
