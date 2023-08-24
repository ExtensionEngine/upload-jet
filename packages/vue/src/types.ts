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
  };
};

export type FileName = string;
export type PolicyResponse = Record<FileName, Policy>;

export const errorCode = {
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE'
} as const;
export type ErrorCode = (typeof errorCode)[keyof typeof errorCode];

export type FileValidationError = {
  code: ErrorCode;
  file: File;
};
