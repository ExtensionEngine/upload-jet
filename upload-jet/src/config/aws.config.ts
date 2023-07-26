import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const awsSchema = z.object({
  bucketName: z.string().nonempty(),
  region: z.string().nonempty(),
  accessKey: z.string().nonempty(),
  secretKey: z.string().nonempty()
});

export default registerAs('aws', () => {
  const config = awsSchema.parse({
    bucketName: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_BUCKET_REGION,
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY
  });
  return config;
});
