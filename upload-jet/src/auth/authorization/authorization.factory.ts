import { Injectable } from '@nestjs/common';
import { User, App } from 'auth/auth.types';
import {
  MongoAbility,
  AbilityBuilder,
  ExtractSubjectType,
  createMongoAbility
} from '@casl/ability';
import { Payload } from 'auth/jwt.dto';
import { Action, Subjects } from 'auth/auth.types';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
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
