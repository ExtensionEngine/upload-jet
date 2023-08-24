import { adminPermissionsType, userPermissionsType } from 'auth/auth.dto';

export const adminPermission: adminPermissionsType[] = [
  'CreateApp',
  'DeleteApp',
  'GetAllUsers'
];
export const userPermission: userPermissionsType[] = ['CreateApp'];
