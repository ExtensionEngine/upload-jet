const Roles = {
  Admin: 'Admin',
  User: 'User'
} as const;
type Role = (typeof Roles)[keyof typeof Roles];

export type User = {
  id: number;
  login: string;
  email: string;
  role: Role;
};

export type JWTPayload = {
  id: number;
  role: (typeof Roles)[keyof typeof Roles];
};
