import { z } from 'zod';

export enum StandardTypes {
  IMAGE = 'image',
  AUDIO = 'audio',
  VIDEO = 'video',
  PDF = 'pdf',
  TEXT = 'text'
}

const fileTypeSchema = z.nativeEnum(StandardTypes);

const setFileNameSchema = z
  .function()
  .args(z.any(), z.string())
  .returns(z.string());

export const uploadOptionsSchema = z
  .object({
    fileType: z.union([z.string(), fileTypeSchema]).optional(),
    maxFileSize: z.string().optional(),
    public: z.boolean().optional(),
    setFileName: setFileNameSchema.optional()
  })
  .strict();

export type UploadOptions = z.infer<typeof uploadOptionsSchema>;
export type SetFileName = z.infer<typeof setFileNameSchema>;
