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

type Role = (typeof Roles)[keyof typeof Roles];

export type AdminPermission =
  (typeof AllPermissions)[keyof typeof AllPermissions];

export type Permission = (typeof AllPermissions)[keyof typeof AllPermissions];

export type UserPermission =
  (typeof UserPermissions)[keyof typeof UserPermissions];

// TODO: adjust user type based on data from the database
export type User = {
  id: number;
  login: string;
  email: string;
  role: Role;
};
