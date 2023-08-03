import type { PolicyResponse, UploadError } from './types';

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

export type SettledResult = {
  status: 'fulfilled' | 'rejected';
  value?: FulfilledValue;
  reason?: UploadError;
};

const UPLOAD_ERROR_MESSAGE =
  'Your proposed upload does not meet the defined policy conditions';
const UPLOAD_ERROR_CODE = 'Error uploading';

export class UploadFailedError extends Error {
  public fileName: string;
  public code: string;

  constructor(message: string, fileName: string, code: string) {
    super(message);
    this.name = this.constructor.name;
    this.fileName = fileName;
    this.code = code;
  }
}

export function useUploadJet({ url }: UseUploadJetOptions): UseUploadJetReturn {
  const upload = async (files: File[]) => {
    const fileNames = files.map(it => it.name);
    const policies = await getUploadPolicy(url, fileNames);
    const result: SettledResult[] = await uploadFilesToS3(policies, files);
    const successfullUploads: (FulfilledValue | undefined)[] = result
      .filter(it => it.status === 'fulfilled')
      .map(it => it.value);
    const failedUploads: (UploadError | undefined)[] = result
      .filter(it => it.status === 'rejected')
      .map(it => it.reason);
    return { successfullUploads, failedUploads };
  };
  return { upload };
}

async function getUploadPolicy(
  url: UseUploadJetOptions['url'],
  fileNames: string[]
): Promise<PolicyResponse> {
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fileNames })
  });
  return result.json();
}

async function uploadFilesToS3(policies: PolicyResponse, files: File[]) {
  const pResult = files.map(async file => {
    const policy = policies[file.name];
    const { name } = file;
    if (!policy) throw new Error(`No policy found for file: ${name}.`);
    const { url, fields } = policy;
    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const parser = new DOMParser();
      const res = await response.text();
      const xmlDoc = parser.parseFromString(res, 'text/xml');
      const message =
        xmlDoc.getElementsByTagName('Message')[0].childNodes[0].nodeValue ||
        UPLOAD_ERROR_MESSAGE;
      const code =
        xmlDoc.getElementsByTagName('Code')[0].childNodes[0].nodeValue ||
        UPLOAD_ERROR_CODE;

      throw new UploadFailedError(message, name, code);
    }
    return { name, key: fields.key };
  });
  return Promise.allSettled(pResult);
}
