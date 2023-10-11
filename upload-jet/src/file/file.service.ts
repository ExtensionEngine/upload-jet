import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import awsConfig from 'config/aws.config';
import { S3ClientService } from 'upload-policy/s3-client.service';

@Injectable()
export class FileService {
  constructor(
    @Inject(awsConfig.KEY)
    private readonly config: ConfigType<typeof awsConfig>,
    private readonly s3ClientService: S3ClientService
  ) {}

  async getFile(key: string, linkDuration: number): Promise<string> {
    return this.s3ClientService.getFile(
      key,
      this.config.bucketName,
      linkDuration
    );
  }
}
