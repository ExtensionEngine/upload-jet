import { Injectable } from '@nestjs/common';
import { User, Application } from './auth.entities';
import {
  MongoAbility,
  AbilityBuilder,
  ExtractSubjectType,
  createMongoAbility
} from '@casl/ability';
import { JWTPayload } from './jwt.types';
import { Action, Subjects } from './auth.types';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class PermissionService {
  private getUserPermissions(
    user: JWTPayload,
    builder: AbilityBuilder<AppAbility>
  ) {
    builder.can('create', Application);
    builder.can('read', User);
    builder.can('delete', Application, { userId: user.id });
    builder.can('update', Application, { userId: user.id });
    builder.can('manage', Application, { userId: user.id });
    builder.can('read', Application, { userId: user.id });
  }
  private getAdminPermissions(builder: AbilityBuilder<AppAbility>) {
    builder.can('manage', 'all');
  }

  getPermission(user: JWTPayload) {
    const builder = new AbilityBuilder<AppAbility>(createMongoAbility);

    if (user.role === 'Admin') {
      this.getAdminPermissions(builder);
    } else {
      this.getUserPermissions(user, builder);
    }

    return builder.build({
      detectSubjectType: item =>
        item.constructor as ExtractSubjectType<Subjects>
    });
  }
}
