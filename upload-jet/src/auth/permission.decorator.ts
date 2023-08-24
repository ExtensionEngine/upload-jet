import { SetMetadata } from '@nestjs/common';
import { permissionsType } from './auth.dto';

export const Permissions = (...permissions: permissionsType[]) =>
  SetMetadata('permissions', permissions);
