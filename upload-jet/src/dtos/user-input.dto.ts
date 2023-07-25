import { z } from 'zod';

const keySchema = z.union([z.string(), z.object({ startsWith: z.string() })]);

export const fileSchema = z
  .object({
    bucket: z.string(),
    key: keySchema,
    maxFileSize: z.number().optional(),
    fileType: z.string().optional(),
    public: z.boolean().optional()
  })
  .strict();

export const userInputSchema = z.record(z.string(), fileSchema);

export type FileDto = z.infer<typeof fileSchema>;
export type userInputDto = z.infer<typeof userInputSchema>;
