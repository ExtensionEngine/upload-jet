import User from './user.entity';

export type JWTPayload = {
  user: Pick<User, 'id' | 'role'>;
};

export type UserProfile = Pick<User, 'id' | 'email'> & {
  avatarUrl: string;
};
