import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { userInputDto } from 'src/dtos/user-input.dto';

// services
import { S3ClientService } from './s3-client.service';
import { ConditionValidationService } from './condition-validation.service';
import { ConditionGeneratorService } from './condition-generator.service';

@Injectable()
export class UploadPolicyService {
  constructor(
    private readonly s3ClientService: S3ClientService,
    private readonly conditionValidationService: ConditionValidationService,
    private readonly conditionGeneratorService: ConditionGeneratorService
  ) {}

  async generateUploadPolicy(fileName: string, fileConditions: userInputDto) {
    const s3Client: S3Client = this.s3ClientService.getS3Client();

    // validate user input
    const validationError =
      this.conditionValidationService.validateUserInput(fileConditions);
    if (!validationError.isValid) return validationError.error;

    // create conditions
    const Conditions =
      this.conditionGeneratorService.generateConditions(fileConditions);

    // after conditions, extract bucket and key from conditions array for createPresignedPost function
    const Bucket =
      this.conditionGeneratorService.generateBucketName(Conditions);
    const Key = this.conditionGeneratorService.generateBucketKey(Conditions);

    const signedPostPolicy = await createPresignedPost(s3Client, {
      Bucket,
      Key,
      Conditions,
      Expires: 600
    });
    const policy = signedPostPolicy.fields.Policy;

    return {
      [fileName]: policy
    };
  }
}
