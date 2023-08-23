import { SetMetadata } from '@nestjs/common';
import { permissions } from './auth.dto';

export const Permissions = (...permissions: permissions[]) =>
  SetMetadata('permissions', permissions);
