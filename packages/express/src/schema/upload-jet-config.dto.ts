import { z } from 'zod';

export const uploadJetConfigSchema = z
  .object({
    apiKey: z.string()
  })
  .strict();

export type UploadJetConfig = z.infer<typeof uploadJetConfigSchema>;
