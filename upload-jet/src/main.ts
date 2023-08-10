import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { handleUncaughtException } from './utils/uncaught-exception-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get(Logger);
  const config = app.get(ConfigService);
  const port = config.get<number>('app.port');

  app.useLogger(logger);

  process.on('uncaughtException', err => handleUncaughtException(err, logger));

  await app.listen(port);
}
bootstrap();
