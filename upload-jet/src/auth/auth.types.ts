import { InferSubjects } from '@casl/ability';

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

export const Roles = {
  Admin: 'Admin',
  User: 'User'
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
