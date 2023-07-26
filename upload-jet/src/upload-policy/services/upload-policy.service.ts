import { Inject, Injectable } from '@nestjs/common';
import { S3ClientService } from './s3-client.service';
import { CreateUploadPolicyPayload } from '../dtos/user-input.dto';
import { ConfigType } from '@nestjs/config';
import awsConfig from 'src/config/aws.config';
import { objectify } from 'radash';

@Injectable()
export class UploadPolicyService {
  constructor(
    @Inject(awsConfig.KEY)
    private readonly config: ConfigType<typeof awsConfig>,
    private readonly s3ClientService: S3ClientService
  ) {}

  async createUploadPolicy(payload: CreateUploadPolicyPayload) {
    const bucket = this.config.bucketName;
    const pResult = Object.entries(payload).map(
      async ([fileName, { key, ...conditions }]) => {
        const policy = await this.s3ClientService.generatePostPolicy({
          bucket,
          key,
          ...conditions
        });
        return { fileName, policy };
      }
    );

    const result = await Promise.all(pResult);
    return objectify(
      result,
      it => it.fileName,
      it => it.policy
    );
  }
}
