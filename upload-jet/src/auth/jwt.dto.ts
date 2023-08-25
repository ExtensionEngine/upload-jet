import { z } from 'zod';
import { AllPermissions } from './auth.types';

const expiresInType = z.union([z.string(), z.number(), z.undefined()]);

export const expiresInSchema = z
  .object({
    expiresIn: expiresInType
  })
  .strict();

export type Payload = {
  username: string;
  email: string;
  permissions: (typeof AllPermissions)[keyof typeof AllPermissions][];
};