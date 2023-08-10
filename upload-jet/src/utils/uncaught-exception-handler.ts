import { Logger } from 'nestjs-pino';

export const handleUncaughtException = (error: Error, logger: Logger) => {
  logger.error(error);
  process.exit(1);
};
