const Permissions = {
  CreateApp: 'CreateApp',
  DeleteApp: 'DeleteApp',
  GetUsers: 'GetAllUsers'
} as const;

const Roles = {
  Admin: 'Admin',
  User: 'User'
} as const;

export type roles = (typeof Roles)[keyof typeof Roles];
export type permissions = (typeof Permissions)[keyof typeof Permissions];

export type user = {
  login: string;
  email: string;
  role: roles;
};
