import databaseConfig from './config/database.config';

export default {
  ...databaseConfig(),
  entities: [`${__dirname}/**/*entity.ts`]
};
