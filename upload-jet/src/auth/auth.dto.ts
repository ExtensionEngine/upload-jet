const Permissions = {
  CreateApp: 'CreateApp',
  DeleteApp: 'DeleteApp',
  GetUsers: 'GetAllUsers'
} as const;

const Roles = {
  Admin: 'Admin',
  User: 'User'
} as const;

type rolesType = (typeof Roles)[keyof typeof Roles];
export type permissionsType = (typeof Permissions)[keyof typeof Permissions];

export type userType = {
  login: string;
  email: string;
  role: rolesType;
};
