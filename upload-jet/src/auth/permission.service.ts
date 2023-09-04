import { Injectable } from '@nestjs/common';
import { User, Application } from './auth.entities';
import {
  MongoAbility,
  AbilityBuilder,
  ExtractSubjectType,
  createMongoAbility
} from '@casl/ability';
import { JWTPayload } from './jwt.types';
import { Action, Subject } from './auth.types';

export type AppAbility = MongoAbility<[Action, Subject]>;

@Injectable()
export class PermissionService {
  getPermission(user: JWTPayload) {
    const builder = new AbilityBuilder<AppAbility>(createMongoAbility);
    if (user.user.role === 'Admin') {
      this.setAdminPermissions(builder);
    } else {
      this.setUserPermissions(user, builder);
    }

    return builder.build({
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subject>
    });
  }

  private setUserPermissions(
    user: JWTPayload,
    builder: AbilityBuilder<AppAbility>
  ) {
    builder.can('create', Application);
    builder.can('read', User);
    builder.can('delete', Application, { userId: user.user.id });
    builder.can('update', Application, { userId: user.user.id });
    builder.can('manage', Application, { userId: user.user.id });
    builder.can('read', Application, { userId: user.user.id });
  }
  private setAdminPermissions(builder: AbilityBuilder<AppAbility>) {
    builder.can('manage', 'all');
  }
}
