export const AllPermissions = {
  CreateApp: 'CreateApp',
  DeleteApp: 'DeleteApp',
  GetUsers: 'GetAllUsers'
} as const;

const UserPermissions = {
  CreateApp: 'CreateApp'
} as const;

export const Roles = {
  Admin: 'Admin',
  User: 'User'
} as const;

type rolesType = (typeof Roles)[keyof typeof Roles];

export type adminPermissionsType =
  (typeof AllPermissions)[keyof typeof AllPermissions];

export type AllPermissions =
  (typeof AllPermissions)[keyof typeof AllPermissions];

export type userPermissionsType =
  (typeof UserPermissions)[keyof typeof UserPermissions];

// TODO: adjust user type based on data from the database
export type userType = {
  login: string;
  email: string;
  role: rolesType;
};
