import {
  ExtractSubjectType,
  MongoQuery,
  PureAbility,
  Subject,
  SubjectRawRule,
  createMongoAbility
} from '@casl/ability';
import { ForbiddenException } from '@nestjs/common';

type Action = 'manage' | 'read' | 'create' | 'update' | 'delete';
type Resource = Subject;
export type AppAbility = PureAbility<[Action, Resource]>;
export type Permission = SubjectRawRule<
  Action,
  ExtractSubjectType<Resource>,
  MongoQuery
>;

export function hasPermission(
  permissions: Permission[],
  action: Action,
  resource: Resource
): boolean {
  const ability = createMongoAbility(permissions);
  return ability.can(action, resource);
}

export function checkPermission({
  action,
  resource
}: {
  action: Action;
  resource: Resource;
}) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const [req] = args;
      if (!hasPermission(req.permissions, action, resource)) {
        throw new ForbiddenException();
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
