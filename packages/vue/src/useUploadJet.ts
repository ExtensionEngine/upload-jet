import type { PolicyResponse, UploadedFile } from './types';

type UseUploadJetOptions = {
  url: string;
};

interface UseUploadJetReturn {
  upload: (files: File[]) => Promise<UploadedFile[]>;
}

export function useUploadJet({ url }: UseUploadJetOptions): UseUploadJetReturn {
  const upload = async (files: File[]) => {
    const fileNames = files.map(it => it.name);
    const policies = await fetchUploadPolicy(url, fileNames);
    return uploadFilesToS3(policies, files);
  };
  return { upload };
}

async function fetchUploadPolicy(
  url: UseUploadJetOptions['url'],
  fileNames: string[]
): Promise<PolicyResponse> {
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ fileNames })
  });
  return result.json();
}

async function uploadFilesToS3(
  policies: PolicyResponse,
  files: File[]
): Promise<UploadedFile[]> {
  const pResult = files.map(async file => {
    const policy = policies[file.name];
    const { name } = file;
    if (!policy) throw new Error(`No policy found for file: ${name}.`);
    const { url, fields } = policy;
    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });
    await fetch(url, { method: 'POST', body: formData });
    return { name, key: fields.key };
  });

  return Promise.all(pResult);
}
