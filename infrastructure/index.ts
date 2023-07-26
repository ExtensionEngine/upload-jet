import * as aws from '@pulumi/aws';
import { PolicyDocument } from '@pulumi/aws/iam';

const bucket = new aws.s3.Bucket('uploadJetBucket', {
  bucket: 'upload-jet',
  acl: 'private',
  forceDestroy: true
});

const bucketPublicAccessBlock = new aws.s3.BucketPublicAccessBlock(
  'uploadJetBucketPublicAccessBlock',
  {
    bucket: bucket.id,
    blockPublicAcls: true,
    blockPublicPolicy: false,
    ignorePublicAcls: true,
    restrictPublicBuckets: false
  }
);

const bucketPolicy = new aws.s3.BucketPolicy(
  'uploadJetBucketPolicy',
  {
    bucket: bucket.bucket,
    policy: bucket.bucket.apply(publicReadPolicy)
  },
  { dependsOn: [bucket, bucketPublicAccessBlock] }
);

function publicReadPolicy(name: string): PolicyDocument {
  return {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: '*',
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${name}/*`],
        Condition: {
          StringEquals: {
            's3:ExistingObjectTag/policy': 'public'
          }
        }
      }
    ]
  };
}

export const bucketName = bucket.id;
