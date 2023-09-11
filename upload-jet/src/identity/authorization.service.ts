import { Injectable } from '@nestjs/common';
import Identity, { Role } from './identity.entity';
import {
  AbilityBuilder,
  PureAbility,
  Subject,
  createMongoAbility
} from '@casl/ability';
import { packRules } from '@casl/ability/extra';

type Action = 'manage' | 'read' | 'create' | 'update' | 'delete';
type Resource = Subject;
type AppAbility = PureAbility<[Action, Resource]>;

@Injectable()
export class AuthorizationService {
  async getPermissions(identity: Identity) {
    const builder = new AbilityBuilder<AppAbility>(createMongoAbility);
    const rules =
      identity.role === Role.ADMIN
        ? this.getAdminPermissions(builder)
        : this.getUserPermissions(builder);
    return packRules(rules);
  }

  private getAdminPermissions({ can, build }: AbilityBuilder<AppAbility>) {
    can('manage', 'all');
    const ability = build();
    return ability.rules;
  }

  private getUserPermissions({ can, build }: AbilityBuilder<AppAbility>) {
    can('read', 'Application');
    can('create', 'Application');
    can('read', 'User', { id: 3 });
    const ability = build();
    return ability.rules;
  }
}
