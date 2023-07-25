import { Module } from '@nestjs/common';
import { UploadPolicyController } from './controllers/upload-policy.controller';
import { UploadPolicyService } from './services/upload-policy.service';
import { S3ClientService } from './services/s3-client.service';
import { ConditionValidationService } from './services/condition-validation.service';
import { ConditionGeneratorService } from './services/condition-generator.service';

@Module({
  controllers: [UploadPolicyController],
  providers: [
    UploadPolicyService,
    S3ClientService,
    ConditionValidationService,
    ConditionGeneratorService
  ]
})
export class UploadPolicyModule {}
