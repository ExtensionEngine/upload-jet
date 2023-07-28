import { z } from 'zod';

export const fileNameArraySchema = z.array(z.string());

export type FileNameArray = z.infer<typeof fileNameArraySchema>;
