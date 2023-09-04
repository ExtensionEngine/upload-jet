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
  user: { id: number; role: Role };
};

export type UserProfile = {
  id: number;
  avatarUrl: string;
  email: string;
};
