import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { S3ClientService } from 'upload-policy/s3-client.service';
import { ApiKeyValidationMiddleware } from 'application/api-key-validation.middleware';
import { ApplicationModule } from 'application/application.module';

@Module({
  controllers: [FileController],
  providers: [FileService, S3ClientService],
  imports: [ApplicationModule]
})
export class FileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyValidationMiddleware).forRoutes('files/:key');
  }
}
