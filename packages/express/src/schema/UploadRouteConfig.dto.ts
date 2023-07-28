import { z } from 'zod';

export const uploadRouteConfigSchema = z
  .object({
    fileType: z.string().optional(),
    maxFileSize: z.number().min(0).optional(),
    public: z.boolean().optional(),
    setFileName: z.function().optional()
  })
  .strict();

export type UploadRouteConfig = z.infer<typeof uploadRouteConfigSchema>;
