import { z } from 'zod';

const setFileNameSchema = z
  .function()
  .args(z.any(), z.string())
  .returns(z.string())
  .optional();

export const uploadOptionsSchema = z
  .object({
    fileType: z.string().optional(),
    maxFileSize: z.string().optional(),
    public: z.boolean().optional(),
    setFileName: setFileNameSchema
  })
  .strict();

export type UploadOptions = z.infer<typeof uploadOptionsSchema>;
export type SetFileName = z.infer<typeof setFileNameSchema>;
