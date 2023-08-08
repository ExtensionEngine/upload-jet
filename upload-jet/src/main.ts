import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AllExceptionsFilter } from './filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);
  const port = config.get<number>('app.port');

  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
  app.useLogger(app.get(Logger));
  await app.listen(port);
}
bootstrap();
