import { Injectable } from '@nestjs/common';

@Injectable()
export class ConditionValidationService {
  private validConditions: string[] = [
    'acl',
    'bucket',
    'content-length-range',
    'Cache-Control',
    'Content-Type',
    'Content-Disposition',
    'Content-Encoding',
    'Expires',
    'key',
    'success_action_redirect',
    'success_action_status',
    'x-amz-algorithm',
    'x-amz-credential',
    'x-amz-date',
    'x-amz-security-token',
    'x-amz-meta-*',
    'x-amz-*'
  ];

  validateConditions(key: string): string | null {
    if (!this.validConditions.includes(key)) {
      return `Invalid condition: ${key}`;
    }
    return null;
  }

  emptyValue(value: string | { startsWith: string }): string | null {
    if (!value || !value.startsWith) {
      return 'Empty value';
    }
    return;
  }
}
