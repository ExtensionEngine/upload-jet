import { Module } from '@nestjs/common';
import { PostPolicyController } from './controllers/postpolicy.controller';
import { PostPolicyService } from './services/post-policy.service';
import { S3ClientService } from './services/s3-client.service';
import { ConditionValidationService } from './services/condition-validation.service';

@Module({
  imports: [],
  controllers: [PostPolicyController],
  providers: [PostPolicyService, S3ClientService, ConditionValidationService]
})
export class PostPolicyModule {}
