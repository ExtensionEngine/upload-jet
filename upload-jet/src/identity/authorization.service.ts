import { Injectable } from '@nestjs/common';
import Identity, { Role } from './identity.entity';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { packRules } from '@casl/ability/extra';
import { AppAbility } from 'shared/auth/authorization';

@Injectable()
export class AuthorizationService {
  async getPermissions(identity: Identity) {
    if (identity.role === Role.ADMIN) {
      const rules = this.getAdminPermissions();
      return packRules(rules);
    }
    if (identity.role === Role.USER) {
      const rules = this.getUserPermissions(identity);
      return packRules(rules);
    }
    const { rules } = new AbilityBuilder(createMongoAbility);
    return packRules(rules);
  }

  private getAdminPermissions() {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    can('manage', 'all');

    const ability = build();
    return ability.rules;
  }

  private getUserPermissions(identity: Identity) {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    can('read', 'Identity', { id: identity.id });
    can('update', 'Identity', { id: identity.id });
    can('create', 'Application');
    can('read', 'Application', { userId: identity.id });
    can('update', 'Application', { userId: identity.id });
    can('delete', 'Application', { userId: identity.id });

    const ability = build();
    return ability.rules;
  }
}
