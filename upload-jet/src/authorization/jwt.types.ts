import { Roles } from './authorization.types';

export type Payload = {
  id: number;
  role: (typeof Roles)[keyof typeof Roles];
};
