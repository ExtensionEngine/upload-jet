import { z } from 'zod';

export const readApplicationSchema = z
  .object({
    id: z.coerce.number().positive()
  })
  .strict();

export type ReadApplicationSchema = z.infer<typeof readApplicationSchema>;

export const createApplicationSchema = z.object({
  name: z.string().nonempty()
});
