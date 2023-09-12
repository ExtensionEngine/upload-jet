import { PureAbility, RawRuleOf, Subject } from '@casl/ability';

type Action = 'manage' | 'read' | 'create' | 'update' | 'delete';
type Resource = Subject;
export type AppAbility = PureAbility<[Action, Resource]>;
export type Permission = RawRuleOf<AppAbility>;

export function hasPermission(
  permissions: Permission[],
  action: Action,
  resource: Resource
): boolean {
  const ability = new PureAbility<[Action, Resource]>(permissions);
  return ability.can(action, resource);
}
