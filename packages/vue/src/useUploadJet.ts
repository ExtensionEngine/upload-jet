import type {
  FulfilledValue,
  PolicyResponse,
  RejectReason,
  SettledResult,
  UploadError,
  UseUploadJetOptions,
  UseUploadJetReturn
} from './types';

export function useUploadJet({ url }: UseUploadJetOptions): UseUploadJetReturn {
  const upload = async (files: File[]) => {
    const fileNames = files.map(it => it.name);
    const policies = await getUploadPolicy(url, fileNames);
    const result: SettledResult[] = await uploadFilesToS3(policies, files);
    const successfullUploads: (FulfilledValue | undefined)[] = result
      .filter(it => it.status === 'fulfilled')
      .map(it => it.value);
    const failedUploads: (RejectReason | undefined)[] = result
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
        xmlDoc.getElementsByTagName('Message')[0].childNodes[0].nodeValue;
      const code =
        xmlDoc.getElementsByTagName('Code')[0].childNodes[0].nodeValue;

      const error: UploadError = {
        fileName: name,
        message: message,
        code: code
      };
      throw error;
    }
    return { name, key: fields.key };
  });
  return Promise.allSettled(pResult);
}
