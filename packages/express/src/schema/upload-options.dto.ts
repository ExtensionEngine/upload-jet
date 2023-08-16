import { z } from 'zod';

const predefinedTypes = z.enum(['image', 'audio', 'video', 'pdf', 'text']);
const mimeType = z.string().and(z.object({}));
const fileTypeSchema = z.union([predefinedTypes, mimeType]);

const setFileNameSchema = z
  .function()
  .args(z.any(), z.string())
  .returns(z.string());

export const uploadOptionsSchema = z
  .object({
    fileType: fileTypeSchema.optional(),
    maxFileSize: z.string().optional(),
    public: z.boolean().optional(),
    setFileName: setFileNameSchema.optional()
  })
  .strict();

export type UploadOptions = z.infer<typeof uploadOptionsSchema>;
export type SetFileName = z.infer<typeof setFileNameSchema>;
