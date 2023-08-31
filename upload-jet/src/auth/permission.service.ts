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
  getPermission(user: JWTPayload) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility
    );

    if (user.role === 'Admin') {
      can('manage', 'all');
    } else {
      can('create', Application);
      can('read', User);
      can('delete', Application, { userId: user.id });
      can('update', Application, { userId: user.id });
      can('manage', Application, { userId: user.id });
      can('read', Application, { userId: user.id });
    }

    return build({
      detectSubjectType: item =>
        item.constructor as ExtractSubjectType<Subjects>
    });
  }
}
