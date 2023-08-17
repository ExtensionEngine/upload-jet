import { Inject, Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigType } from '@nestjs/config';
import awsConfig from 'config/aws.config';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import {
  PredefinedType,
  PolicyOptions,
  PredefinedTypeValue
} from './policy.dto';

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
      const fileTypes = this.getFileTypeOutput(conditions.fileType);
      Conditions.push(fileTypes);
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

  private getFileTypeOutput(fileType: string) {
    return Object.values(PredefinedType).includes(
      fileType as PredefinedTypeValue
    )
      ? ['starts-with', '$Content-Type', `${fileType}/`]
      : { 'Content-Type': fileType };
  }
}
