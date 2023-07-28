import { z } from 'zod';

export const uploadRouteConfigSchema = z
  .object({
    fileType: z.string(),
    maxFileSize: z.number().min(0),
    public: z.boolean(),
    setFileName: z.function()
  })
  .strict();

export type UploadRouteConfig = z.infer<typeof uploadRouteConfigSchema>;
