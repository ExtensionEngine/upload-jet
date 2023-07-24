import { Injectable } from "@nestjs/common";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { PostPolicyDto } from "../../dtos/post-policy.dto";

// services
import { S3ClientService } from "./s3-client.service";
import { ConditionValidationService } from "./condition-validation.service";

@Injectable()
export class PostPolicyService {
  constructor(
    private readonly s3ClientService: S3ClientService,
    private readonly conditionValidationService: ConditionValidationService
  ) {}

  async generatePostPolicy(dto: PostPolicyDto) {
    const s3Client: S3Client = this.s3ClientService.getS3Client();
    const Conditions = [];

    for (const key in dto) {
      const validationError =
        this.conditionValidationService.validateConditions(key);
      if (validationError) {
        return validationError;
      }

      const emptyValue = this.conditionValidationService.emptyValue(dto[key]);
      if (emptyValue) {
        continue;
      }

      if (dto[key].hasOwnProperty("startsWith")) {
        Conditions.push(["starts-with", `$${key}`, dto[key].startsWith]);
      } else {
        Conditions.push(["eq", `$${key}`, dto[key]]);
      }
    }

    const Bucket = "mcabo";
    const Key = "a";

    const signedPostPolicy = await createPresignedPost(s3Client, {
      Bucket,
      Key,
      Conditions,
      Expires: 600
    });
    return signedPostPolicy;
  }
}
