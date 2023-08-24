import { predefinedType } from '@upload-jet/shared';
import { z } from 'zod';

const fileNameSchema = z.string();
const mimeTypeSchema = z.string();
const fileTypeSchema = z.union([z.nativeEnum(predefinedType), mimeTypeSchema]);

const policyOptionsSchema = z
  .object({
    key: z.string(),
    maxFileSize: z.number().optional(),
    fileType: fileTypeSchema.optional(),
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
