import { InferSubjects } from '@casl/ability';

const Actions = {
  Manage: 'manage',
  Create: 'create',
  Delete: 'delete',
  Read: 'read',
  Update: 'update'
} as const;
export type Action = (typeof Actions)[keyof typeof Actions];

export type AppData = {
  id: number;
  userId: number;
  name: string;
};
export class App {
  id: number;
  userId: number;
  name: string;
  constructor(data: AppData) {
    this.id = data.id;
    this.userId = data.userId;
    this.name = data.name;
  }
}
export class User {
  id: number;
  login: string;
  email: string;
  role: Role;
}
export type Subjects = InferSubjects<typeof User | typeof App> | 'all';

export const Roles = {
  Admin: 'Admin',
  User: 'User'
} as const;
type Role = (typeof Roles)[keyof typeof Roles];
