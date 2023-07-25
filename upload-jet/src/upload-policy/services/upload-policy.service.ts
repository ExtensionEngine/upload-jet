import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { userInputDto } from 'src/dtos/user-input.dto';

// services
import { S3ClientService } from './s3-client.service';
import { ConditionValidationService } from './condition-validation.service';

////////
import { conditionMappings } from '../../dtos/upload-policy.dto';

@Injectable()
export class UploadPolicyService {
  constructor(
    private readonly s3ClientService: S3ClientService,
    private readonly conditionValidationService: ConditionValidationService
  ) {}

  async generateUploadPolicy(
    userInput: userInputDto,
    fileConditions: userInputDto
  ) {
    const s3Client: S3Client = this.s3ClientService.getS3Client();
    const fileName = Object.keys(userInput)[0];
    const Conditions = [];

    const validationError =
      this.conditionValidationService.validateUserInput(fileConditions);
    if (!validationError.isValid) return validationError.error;

    ////////////
    for (const key in fileConditions) {
      const value = fileConditions[key];
      const conditionFunction = conditionMappings[key];
      if (conditionFunction) {
        const conditionObject = conditionFunction(value);
        Conditions.push(conditionObject);
      } else {
        const conditionObject = { [key]: value };
        Conditions.push(conditionObject);
      }
    }

    const bucketConditions = Conditions.filter(
      condition => 'bucket' in condition
    );
    const bucketValue =
      bucketConditions.length > 0 ? bucketConditions[0].bucket : undefined;

    const keyConditions = Conditions.filter(condition => 'key' in condition);
    const keyValue =
      keyConditions.length > 0 ? keyConditions[0].key : undefined;

    const Bucket = bucketValue;
    const Key = keyValue;
    const signedPostPolicy = await createPresignedPost(s3Client, {
      Bucket,
      Key,
      Conditions,
      Expires: 600
    });
    const policy = signedPostPolicy.fields.Policy;
    console.log(policy);

    return {
      [fileName]: signedPostPolicy.fields.Policy
    };
  }
}
