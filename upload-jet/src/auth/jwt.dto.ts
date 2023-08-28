import { Roles } from './auth.types';

export type Payload = {
  id: number;
  role: (typeof Roles)[keyof typeof Roles];
};
