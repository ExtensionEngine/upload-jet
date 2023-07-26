import { z } from 'zod';

const fileNameSchema = z.string();

const policyOptionsSchema = z
  .object({
    key: z.string(),
    maxFileSize: z.number().optional(),
    fileType: z.string().optional(),
    public: z.boolean().optional()
  })
  .strict();

export type PolicyOptions = z.infer<typeof policyOptionsSchema>;

export const createUploadPolicySchema = z.record(
  fileNameSchema,
  policyOptionsSchema
);

export type CreateUploadPolicyPayload = z.infer<
  typeof createUploadPolicySchema
>;
