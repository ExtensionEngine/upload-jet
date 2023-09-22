import { Permission } from 'shared/auth/authorization';

export {};

declare global {
  namespace Express {
    import Application from 'application/application.entity';
    export interface Request {
      userId: number;
      permissions: Permission[];
      application: Application;
    }
  }
}
