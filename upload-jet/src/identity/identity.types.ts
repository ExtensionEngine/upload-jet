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

//TODO: Remove this type after we implement roles in database
export type TemporaryUserType = {
  id: number;
  githubId: number;
  email: string;
  role: Role;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export type JWTPayload = {
  user: Pick<TemporaryUserType, 'id' | 'role'>;
};

export type UserProfile = Pick<TemporaryUserType, 'id' | 'email'> & {
  avatarUrl: string;
};
