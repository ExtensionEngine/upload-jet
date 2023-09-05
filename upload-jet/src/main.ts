import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get(Logger);
  const config = app.get(ConfigService);
  const port = config.get<number>('app.port');

  app.useLogger(logger);
  app.enableCors();

  process.on('uncaughtException', err => logUncaughtException(err, logger));

  await app.listen(port, () => {
    logger.log(`🚀 Application is listening on port ${port}`);
  });
}
bootstrap();

function logUncaughtException(error: Error, logger: Logger) {
  logger.error(error);
  process.exit(1);
}
