import { SetMetadata } from '@nestjs/common';
import { AllPermissions } from './auth.dto';

export const Permissions = (...permissions: AllPermissions[]) =>
  SetMetadata('permissions', permissions);
