const getPostPolicy = async function (url: string, fileName: string[]) {
  console.log(url);
  console.log(fileName);
  // mock a return value -> post policies

  return {
    'image.jpeg': {
      url: 'https://mcabo.s3.eu-north-1.amazonaws.com/',
      fields: {
        Tagging:
          '<Tagging><TagSet><Tag><Key>policy</Key><Value>public</Value></Tag></TagSet></Tagging>',
        bucket: 'mcabo',
        'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
        'X-Amz-Credential':
          'AKIA3O56TMPDARXIXBWQ/20230801/eu-north-1/s3/aws4_request',
        'X-Amz-Date': '20230801T134500Z',
        key: 'file1',
        Policy:
          'eyJleHBpcmF0aW9uIjoiMjAyMy0wOC0wMVQxNDo0NTowMFoiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCwyNTAwMDAwXSx7IlRhZ2dpbmciOiI8VGFnZ2luZz48VGFnU2V0PjxUYWc+PEtleT5wb2xpY3k8L0tleT48VmFsdWU+cHVibGljPC9WYWx1ZT48L1RhZz48L1RhZ1NldD48L1RhZ2dpbmc+In0seyJidWNrZXQiOiJtY2FibyJ9LHsiWC1BbXotQWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsiWC1BbXotQ3JlZGVudGlhbCI6IkFLSUEzTzU2VE1QREFSWElYQldRLzIwMjMwODAxL2V1LW5vcnRoLTEvczMvYXdzNF9yZXF1ZXN0In0seyJYLUFtei1EYXRlIjoiMjAyMzA4MDFUMTM0NTAwWiJ9LHsia2V5IjoiZmlsZTEifV19',
        'X-Amz-Signature':
          '68c10958509c8bfa1e27dac08d80e38a6eae416ddacc3bb12a36172c0714507d'
      }
    },
    'image.png': {
      url: 'https://mcabo.s3.eu-north-1.amazonaws.com/',
      fields: {
        Tagging:
          '<Tagging><TagSet><Tag><Key>policy</Key><Value>public</Value></Tag></TagSet></Tagging>',
        bucket: 'mcabo',
        'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
        'X-Amz-Credential':
          'AKIA3O56TMPDARXIXBWQ/20230801/eu-north-1/s3/aws4_request',
        'X-Amz-Date': '20230801T134500Z',
        key: 'file2',
        Policy:
          'eyJleHBpcmF0aW9uIjoiMjAyMy0wOC0wMVQxNDo0NTowMFoiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCwyNTAwMDAwXSx7IlRhZ2dpbmciOiI8VGFnZ2luZz48VGFnU2V0PjxUYWc+PEtleT5wb2xpY3k8L0tleT48VmFsdWU+cHVibGljPC9WYWx1ZT48L1RhZz48L1RhZ1NldD48L1RhZ2dpbmc+In0seyJidWNrZXQiOiJtY2FibyJ9LHsiWC1BbXotQWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsiWC1BbXotQ3JlZGVudGlhbCI6IkFLSUEzTzU2VE1QREFSWElYQldRLzIwMjMwODAxL2V1LW5vcnRoLTEvczMvYXdzNF9yZXF1ZXN0In0seyJYLUFtei1EYXRlIjoiMjAyMzA4MDFUMTM0NTAwWiJ9LHsia2V5IjoiZmlsZTIifV19',
        'X-Amz-Signature':
          '14b3fb80a8774a95f0a93fe87bb111dfac911c67ea6c6159101fa2ac726b2a39'
      }
    }
  };
};

const postFileToAWS = async function (url: string, formData: FormData) {
  return fetch(url, {
    method: 'POST',
    body: formData
  });
};

export default { getPostPolicy, postFileToAWS };
