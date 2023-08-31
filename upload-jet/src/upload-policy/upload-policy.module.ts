import { Module } from '@nestjs/common';
import { UploadPolicyController } from './upload-policy.controller';
import { UploadPolicyService } from './upload-policy.service';
import { S3ClientService } from './s3-client.service';

@Module({
  controllers: [UploadPolicyController],
  providers: [UploadPolicyService, S3ClientService]
})
export class UploadPolicyModule {}
