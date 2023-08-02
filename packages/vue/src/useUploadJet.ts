import type { PolicyResponse, UploadedFile } from './types';

type UseUploadJetOptions = {
  url: string;
};

interface UseUploadJetReturn {
  upload: (files: File[]) => Promise<any>;
}

export function useUploadJet({ url }: UseUploadJetOptions): UseUploadJetReturn {
  const upload = async (files: File[]) => {
    const fileNames = files.map(it => it.name);
    const policies = await getUploadPolicy(url, fileNames);
    const result = await uploadFilesToS3(policies, files);
    const successfullUploads = result
      .filter(it => it.status === 'fulfilled')
      .map((it: any) => it.value);
    const failedUploads = result
      .filter(it => it.status === 'rejected')
      .map((it: any) => ({ reason: it.reason }));
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
    const response = await fetch(url, { method: 'POST', body: formData });
    // TODO: Get error message from response
    if (!response.ok) throw new Error('Something went wrong.');
    return { name, key: fields.key };
  });

  return Promise.allSettled(pResult);
}
