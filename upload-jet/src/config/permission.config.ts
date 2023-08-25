import { AdminPermission, UserPermission } from 'auth/auth.types';

export const adminPermission: AdminPermission[] = [
  'CreateApp',
  'DeleteApp',
  'GetAllUsers'
];
export const userPermission: UserPermission[] = ['CreateApp'];
