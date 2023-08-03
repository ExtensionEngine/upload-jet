export type UploadedFile = {
  name: string;
  key: string;
};

export type UploadError = {
  fileName: string;
  message: string | null;
  code: string | null;
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

export type UseUploadJetOptions = {
  url: string;
};

export interface UseUploadJetReturn {
  upload: (files: File[]) => Promise<any>;
}

export type FulfilledValue = {
  name: string;
  key: string;
};

export type RejectReason = {
  fileName: string;
  message: string;
  code: string;
};

export type SettledResult = {
  status: 'fulfilled' | 'rejected';
  value?: FulfilledValue;
  reason?: RejectReason;
};
