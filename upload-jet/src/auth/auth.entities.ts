import { ApplicationData, Role } from './auth.types';

export class Application {
  id: number;
  userId: number;
  name: string;
  constructor(data: ApplicationData) {
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
