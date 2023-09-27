import { Permission } from 'shared/auth/authorization';

export {};

declare global {
  namespace Express {
    export interface Request {
      userId: number;
      permissions: Permission[];
      applicationId: number;
    }
  }
}
