import { Role } from './authorization.types';

export type JWTPayload = {
  id: number;
  role: Role;
};
