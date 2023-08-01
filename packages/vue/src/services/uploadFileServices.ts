import axios from 'axios';

const getPostPolicy = async function (fileName: string[]) {
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
        'X-Amz-Date': '20230801T123705Z',
        key: 'file1',
        Policy:
          'eyJleHBpcmF0aW9uIjoiMjAyMy0wOC0wMVQxMzozNzowNVoiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCwyNTAwMDAwXSx7IlRhZ2dpbmciOiI8VGFnZ2luZz48VGFnU2V0PjxUYWc+PEtleT5wb2xpY3k8L0tleT48VmFsdWU+cHVibGljPC9WYWx1ZT48L1RhZz48L1RhZ1NldD48L1RhZ2dpbmc+In0seyJidWNrZXQiOiJtY2FibyJ9LHsiWC1BbXotQWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsiWC1BbXotQ3JlZGVudGlhbCI6IkFLSUEzTzU2VE1QREFSWElYQldRLzIwMjMwODAxL2V1LW5vcnRoLTEvczMvYXdzNF9yZXF1ZXN0In0seyJYLUFtei1EYXRlIjoiMjAyMzA4MDFUMTIzNzA1WiJ9LHsia2V5IjoiZmlsZTEifV19',
        'X-Amz-Signature':
          'd0304ffc45613e33d26e55191d5d0c01ff62495b07d2601a1dc000a195334a0f'
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
        'X-Amz-Date': '20230801T123705Z',
        key: 'file2',
        Policy:
          'eyJleHBpcmF0aW9uIjoiMjAyMy0wOC0wMVQxMzozNzowNVoiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCwyNTAwMDAwXSx7IlRhZ2dpbmciOiI8VGFnZ2luZz48VGFnU2V0PjxUYWc+PEtleT5wb2xpY3k8L0tleT48VmFsdWU+cHVibGljPC9WYWx1ZT48L1RhZz48L1RhZ1NldD48L1RhZ2dpbmc+In0seyJidWNrZXQiOiJtY2FibyJ9LHsiWC1BbXotQWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsiWC1BbXotQ3JlZGVudGlhbCI6IkFLSUEzTzU2VE1QREFSWElYQldRLzIwMjMwODAxL2V1LW5vcnRoLTEvczMvYXdzNF9yZXF1ZXN0In0seyJYLUFtei1EYXRlIjoiMjAyMzA4MDFUMTIzNzA1WiJ9LHsia2V5IjoiZmlsZTIifV19',
        'X-Amz-Signature':
          'fb1dea0c34e5001fdb7d14e269e1b4ac47f48d957ee47ca40442809961cb99ee'
      }
    }
  };
};

const postFileToAWS = async function (url: string, formData: FormData) {
  const response = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export default { getPostPolicy, postFileToAWS };
