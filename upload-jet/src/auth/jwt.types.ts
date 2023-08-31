import { Role } from './auth.types';

export type JWTPayload = {
  id: number;
  role: Role;
};
