import { Injectable } from '@nestjs/common';
import { User, App } from './authorization.types';
import {
  MongoAbility,
  AbilityBuilder,
  ExtractSubjectType,
  createMongoAbility
} from '@casl/ability';
import { Payload } from './jwt.types';
import { Action, Subjects } from './authorization.types';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class AuthorizationFactory {
  defineAbility(user: Payload) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility
    );

    if (user.role === 'Admin') {
      can('manage', 'all');
    } else {
      can('create', App);
      can('read', User);
      can('delete', App, { userId: user.id });
      can('update', App, { userId: user.id });
      can('manage', App, { userId: user.id });
      can('read', App, { userId: user.id });
    }

    return build({
      detectSubjectType: item =>
        item.constructor as ExtractSubjectType<Subjects>
    });
  }
}
