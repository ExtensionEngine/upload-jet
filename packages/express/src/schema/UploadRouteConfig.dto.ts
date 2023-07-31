import { z } from 'zod';

export const uploadRouteConfigSchema = z
  .object({
    fileType: z.string().optional(),
    maxFileSize: z.string().optional(),
    public: z.boolean().optional(),
    setFileName: z
      .function()
      .args(z.any(), z.string())
      .returns(z.string())
      .optional()
  })
  .strict();

export type UploadRouteConfig = z.infer<typeof uploadRouteConfigSchema>;
