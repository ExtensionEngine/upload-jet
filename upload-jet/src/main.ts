import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get(Logger);
  const config = app.get(ConfigService);
  const port = config.get<number>('app.port');
  const appUrl = config.get<string>('app.appUrl');
  app.use(cookieParser());

  app.useLogger(logger);

  app.enableCors({ credentials: true, origin: appUrl });

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
