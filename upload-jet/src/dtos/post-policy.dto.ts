export class PostPolicyDto {
  acl?: string | { startsWith: string };
  bucket?: string;
  'content-length-range'?: [];
  'Cache-Control': string | { startsWith: string };
  'Content-Type': string | { startsWith: string };
  'Content-Disposition': string | { startsWith: string };
  'Content-Encoding': string | { startsWith: string };
  Expires?: string | { startsWith: string };
  key?: string | { startsWith: string };
  success_action_redirect?: string | { startsWith: string };
  success_action_status?: string;
  'x-amz-algorithm'?: string;
  'x-amz-credential'?: string;
  'x-amz-date'?: string;
  'x-amz-security-token'?: string;
  'x-amz-meta-*'?: string | { startsWith: string };
  'x-amz-*'?: string;
}
