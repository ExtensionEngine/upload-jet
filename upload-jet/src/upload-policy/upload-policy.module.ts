import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UploadPolicyController } from './upload-policy.controller';
import { UploadPolicyService } from './upload-policy.service';
import { S3ClientService } from './s3-client.service';
import { ApiKeyValidationMiddleware } from 'application/api-key-validation.middleware';
import { ApplicationModule } from 'application/application.module';

@Module({
  controllers: [UploadPolicyController],
  providers: [UploadPolicyService, S3ClientService],
  imports: [ApplicationModule]
})
export class UploadPolicyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyValidationMiddleware).forRoutes('upload-policy');
  }
}
