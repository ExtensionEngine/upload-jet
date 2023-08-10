import { z } from 'zod';

const StandardTypes = z.enum(['image', 'audio', 'video', 'pdf', 'text']);
const fileTypeSchema = z.union([StandardTypes, z.string().and(z.object({}))]);

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
