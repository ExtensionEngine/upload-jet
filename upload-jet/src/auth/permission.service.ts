import { Injectable } from '@nestjs/common';
import { User, Application } from './auth.entities';
import {
  MongoAbility,
  AbilityBuilder,
  ExtractSubjectType,
  createMongoAbility
} from '@casl/ability';
import { Action, Subject } from './auth.types';

export type AppAbility = MongoAbility<[Action, Subject]>;

@Injectable()
export class PermissionService {
  getPermission(user: Pick<User, 'id' | 'role'>) {
    const builder = new AbilityBuilder<AppAbility>(createMongoAbility);
    if (user.role === 'Admin') {
      this.setAdminPermissions(builder);
    } else {
      this.setUserPermissions(user.id, builder);
    }

    return builder.build({
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subject>
    });
  }

  private setUserPermissions(
    userId: User['id'],
    builder: AbilityBuilder<AppAbility>
  ) {
    builder.can('create', Application);
    builder.can('read', User);
    builder.can('delete', Application, { userId });
    builder.can('update', Application, { userId });
    builder.can('manage', Application, { userId });
    builder.can('read', Application, { userId });
  }
  private setAdminPermissions(builder: AbilityBuilder<AppAbility>) {
    builder.can('manage', 'all');
  }
}
