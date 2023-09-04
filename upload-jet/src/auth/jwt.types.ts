import { Role } from './auth.types';

export type JWTPayload = {
  user: { id: number; role: Role };
};
