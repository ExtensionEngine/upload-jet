// TODO: retrieve an actual user and app from the database, for now use mocked user and mocked app
import { App, AppData, User } from './auth.types';

export const MockedUser: User = {
  id: 1,
  login: 'MockedUser1',
  email: 'mocked.user1@gmail.com',
  role: 'User'
};

const appPayload: AppData = {
  id: 2,
  userId: 3,
  name: 'MyApp'
};
export const MockedApp = new App(appPayload);
