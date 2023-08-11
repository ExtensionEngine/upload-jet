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

export const StandardTypes = {
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video',
  PDF: 'pdf',
  TEXT: 'text'
} as const;

type MimeType = string & {};
export type FileType = 'image' | 'audio' | 'video' | 'pdf' | 'text' | MimeType;
