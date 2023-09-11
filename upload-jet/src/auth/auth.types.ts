import { InferSubjects } from '@casl/ability';
import { Application, User } from './auth.entities';

const Actions = {
  Manage: 'manage',
  Create: 'create',
  Delete: 'delete',
  Read: 'read',
  Update: 'update'
} as const;
export type Action = (typeof Actions)[keyof typeof Actions];

export type ApplicationData = {
  id: number;
  userId: number;
  name: string;
};

export type Subject = InferSubjects<typeof User | typeof Application> | 'all';

export const Roles = {
  ADMIN: 'admin',
  USER: 'user'
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
