import {
  ExtractSubjectType,
  MongoQuery,
  PureAbility,
  Subject,
  SubjectRawRule,
  createMongoAbility
} from '@casl/ability';

export type Action = 'manage' | 'read' | 'create' | 'update' | 'delete';
export type Resource = Subject;
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
