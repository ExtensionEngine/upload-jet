import { z } from 'zod';
import { AllPermissions } from './auth.dto';

const expiresInType = z.union([z.string(), z.number(), z.undefined()]);

export const expiresInSchema = z
  .object({
    expiresIn: expiresInType
  })
  .strict();

export type payloadType = {
  username: string;
  email: string;
  permission: (typeof AllPermissions)[keyof typeof AllPermissions][];
};
