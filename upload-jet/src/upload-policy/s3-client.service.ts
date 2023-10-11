import { Inject, Injectable } from '@nestjs/common';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigType } from '@nestjs/config';
import awsConfig from 'config/aws.config';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { PolicyOptions } from './policy.dto';
import { FileType, getMimeType } from '@upload-jet/shared';

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

  async getFile(key: string, bucket: string, duration: number) {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    return getSignedUrl(this.s3Client, command, { expiresIn: duration });
  }

  generatePostPolicy({
    bucket,
    key,
    ...conditions
  }: PolicyOptions & { bucket: string }) {
    const Conditions = [];
    const Fields = {};

    if ('maxFileSize' in conditions) {
      Conditions.push(['content-length-range', 0, conditions.maxFileSize]);
    }
    if ('fileType' in conditions) {
      const fileTypeCondition = this.getFileTypeCondition(conditions.fileType);
      Conditions.push(fileTypeCondition);
    }
    if (conditions.public) {
      Fields['Tagging'] = this.getPublicPolicyTag();
    }

    return createPresignedPost(this.s3Client, {
      Bucket: bucket,
      Key: key,
      Fields,
      Conditions
    });
  }

  private getPublicPolicyTag() {
    return `<Tagging><TagSet><Tag><Key>policy</Key><Value>public</Value></Tag></TagSet></Tagging>`;
  }

  private getFileTypeCondition(fileType: FileType) {
    const mimeType = getMimeType(fileType);
    if (mimeType.includes('*')) {
      return ['starts-with', '$Content-Type', mimeType.replace('*', '')];
    }
    return { 'Content-Type': fileType };
  }
}
