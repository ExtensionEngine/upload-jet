import { Inject, Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigType } from '@nestjs/config';
import awsConfig from 'src/config/aws.config';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';

@Injectable()
export class S3ClientService {
  private s3Client: S3Client;

  constructor(
    @Inject(awsConfig.KEY)
    private config: ConfigType<typeof awsConfig>
  ) {
    const { region, accessKey, secretKey } = this.config;

    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey
      }
    });
  }

  generatePostPolicy({ bucket, key }) {
    return createPresignedPost(this.s3Client, { Bucket: bucket, Key: key });
  }
}
