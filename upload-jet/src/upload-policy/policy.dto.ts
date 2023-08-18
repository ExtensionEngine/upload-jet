import { z } from 'zod';

export const predefinedType = {
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video',
  PDF: 'pdf',
  TEXT: 'text'
} as const;

const fileNameSchema = z.string();
const predefinedTypes = z.nativeEnum(predefinedType);
const mimeType = z.string();
const fileTypeSchema = z.union([predefinedTypes, mimeType]);

export type MimeType = string & {};
export type FileType =
  | (typeof predefinedType)[keyof typeof predefinedType]
  | MimeType;

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
