import { z } from 'zod';

export const applicationIdSchema = z.coerce.number().positive();

export type ApplicationId = z.infer<typeof applicationIdSchema>;
