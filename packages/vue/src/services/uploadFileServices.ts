import axios from 'axios'

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
        'X-Amz-Credential': 'AKIA3O56TMPDARXIXBWQ/20230731/eu-north-1/s3/aws4_request',
        'X-Amz-Date': '20230731T132316Z',
        key: 'file1',
        Policy:
          'eyJleHBpcmF0aW9uIjoiMjAyMy0wNy0zMVQxNDoyMzoxNloiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCwyNTAwMDAwXSx7IlRhZ2dpbmciOiI8VGFnZ2luZz48VGFnU2V0PjxUYWc+PEtleT5wb2xpY3k8L0tleT48VmFsdWU+cHVibGljPC9WYWx1ZT48L1RhZz48L1RhZ1NldD48L1RhZ2dpbmc+In0seyJidWNrZXQiOiJtY2FibyJ9LHsiWC1BbXotQWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsiWC1BbXotQ3JlZGVudGlhbCI6IkFLSUEzTzU2VE1QREFSWElYQldRLzIwMjMwNzMxL2V1LW5vcnRoLTEvczMvYXdzNF9yZXF1ZXN0In0seyJYLUFtei1EYXRlIjoiMjAyMzA3MzFUMTMyMzE2WiJ9LHsia2V5IjoiZmlsZTEifV19',
        'X-Amz-Signature': 'ac1bf574336ec6dd007e3db6d1c053dfa3f77c33b62c22285a1345ee60a9a894'
      }
    },
    'image.png': {
      url: 'https://mcabo.s3.eu-north-1.amazonaws.com/',
      fields: {
        Tagging:
          '<Tagging><TagSet><Tag><Key>policy</Key><Value>public</Value></Tag></TagSet></Tagging>',
        bucket: 'mcabo',
        'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
        'X-Amz-Credential': 'AKIA3O56TMPDARXIXBWQ/20230731/eu-north-1/s3/aws4_request',
        'X-Amz-Date': '20230731T132316Z',
        key: 'file2',
        Policy:
          'eyJleHBpcmF0aW9uIjoiMjAyMy0wNy0zMVQxNDoyMzoxNloiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCwyNTAwMDAwXSx7IlRhZ2dpbmciOiI8VGFnZ2luZz48VGFnU2V0PjxUYWc+PEtleT5wb2xpY3k8L0tleT48VmFsdWU+cHVibGljPC9WYWx1ZT48L1RhZz48L1RhZ1NldD48L1RhZ2dpbmc+In0seyJidWNrZXQiOiJtY2FibyJ9LHsiWC1BbXotQWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsiWC1BbXotQ3JlZGVudGlhbCI6IkFLSUEzTzU2VE1QREFSWElYQldRLzIwMjMwNzMxL2V1LW5vcnRoLTEvczMvYXdzNF9yZXF1ZXN0In0seyJYLUFtei1EYXRlIjoiMjAyMzA3MzFUMTMyMzE2WiJ9LHsia2V5IjoiZmlsZTIifV19',
        'X-Amz-Signature': 'de9f92af135f07ae665239a12dab1991255db573126dc55691b51079e9537744'
      }
    }
  }
}

const postFileToAWS = async function (url: string, formData: FormData) {
  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log('File uploaded succesfully to AWS:', response?.data?.originalname)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export default { getPostPolicy, postFileToAWS }
