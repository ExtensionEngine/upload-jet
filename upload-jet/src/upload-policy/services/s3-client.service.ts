import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3ClientService {
  private s3Client: S3Client;

  constructor(private configService: ConfigService) {
    const region = this.configService.get('AWS_BUCKET_REGION');
    const accessKeyId = this.configService.get('AWS_ACCESS_KEY');
    const secretAccessKey = this.configService.get('AWS_SECRET_KEY');

    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
      }
    });
  }

  getS3Client(): S3Client {
    return this.s3Client;
  }
}
