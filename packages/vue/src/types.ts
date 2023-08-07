export type UploadedFile = {
  name: string;
  key: string;
};

export type Policy = {
  url: string;
  fields: {
    bucket: string;
    'X-Amz-Algorithm': string;
    'X-Amz-Credential': string;
    'X-Amz-Date': string;
    key: string;
    Policy: string;
    'X-Amz-Signature': string;
    Tagging?: string;
    'Content-Type'?: string;
  };
};

export type FileName = string;
export type PolicyResponse = Record<FileName, Policy>;
