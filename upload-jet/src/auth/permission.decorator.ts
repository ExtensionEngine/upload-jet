import { SetMetadata } from '@nestjs/common';
import { Permission } from './auth.types';

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata('permissions', permissions);
