import { z } from 'zod';

export const fetchApplicationSchema = z
  .object({
    id: z.coerce.number().positive()
  })
  .strict();

export type FetchApplication = z.infer<typeof fetchApplicationSchema>;
