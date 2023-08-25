import { AllPermissions } from './auth.types';

export type Payload = {
  id: number;
  permissions: (typeof AllPermissions)[keyof typeof AllPermissions][];
};
