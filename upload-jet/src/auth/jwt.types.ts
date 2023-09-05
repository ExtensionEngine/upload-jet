import { User } from './auth.entities';

export type JWTPayload = {
  user: Pick<User, 'id' | 'role'>;
};
