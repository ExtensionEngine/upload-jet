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
    return uploadFilesToS3(policies, files);
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

function uploadFilesToS3(policies: PolicyResponse, files: File[]) {
  const pResult = files.map(async file => {
    const { url, fields } = policies[file.name];
    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const response = await fetch(url, { method: 'POST', body: formData });
    return response.json();
  });

  return Promise.allSettled(pResult);
}
