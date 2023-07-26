import { Injectable } from '@nestjs/common';

@Injectable()
export class ConditionGeneratorService {
  private conditionMappings = {
    maxFileSize: (value: number) => ({ 'content-length-range': [0, value] }),
    fileType: (value: string) => ({ 'Content-Type': value }),
    public: (value: boolean) => ({ acl: value })
  };
  generateConditions = function (fileConditions) {
    const Conditions = [];
    for (const key in fileConditions) {
      const value = fileConditions[key];
      const conditionFunction = this.conditionMappings[key];
      const conditionObject = conditionFunction
        ? conditionFunction(value)
        : { [key]: value };
      Conditions.push(conditionObject);
    }
    return Conditions;
  };
  generateBucketName = function (Conditions) {
    const bucketConditions = Conditions.filter(
      condition => 'bucket' in condition
    );
    const bucketValue =
      bucketConditions.length > 0 ? bucketConditions[0].bucket : undefined;
    return bucketValue;
  };
  generateBucketKey = function (Conditions) {
    const keyConditions = Conditions.filter(condition => 'key' in condition);
    const keyValue =
      keyConditions.length > 0 ? keyConditions[0].key : undefined;
    return keyValue;
  };
}
