import { Permission } from 'shared/auth/authorization';
import ApplicationEntity from 'application/application.entity';

export {};

declare global {
  namespace Express {
    export interface Request {
      userId: number;
      permissions: Permission[];
      application: ApplicationEntity;
    }
  }
}
