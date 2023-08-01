import { z } from 'zod';

export const createUploadPolicyBodySchema = z.object({
  files: z.array(z.string())
});

export type CreateUploadPolicyBody = z.infer<
  typeof createUploadPolicyBodySchema
>;
