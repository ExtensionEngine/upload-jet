import { Injectable } from "@nestjs/common";
import { config } from "dotenv";
import { S3Client } from "@aws-sdk/client-s3";

// env variables
config();
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

@Injectable()
export class S3ClientService {
  private s3Client: S3Client;

  constructor() {
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
