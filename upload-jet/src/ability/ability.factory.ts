import { Injectable } from '@nestjs/common';
import { User, App } from 'auth/auth.types';
import {
  MongoAbility,
  InferSubjects,
  AbilityBuilder,
  ExtractSubjectType,
  createMongoAbility
} from '@casl/ability';

export const Actions = {
  Manage: 'manage',
  Create: 'create',
  Delete: 'delete',
  Read: 'read',
  Update: 'update'
} as const;

export type Action = (typeof Actions)[keyof typeof Actions];

export type Subjects = InferSubjects<typeof User | typeof App> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility
    );

    if (user.role === 'Admin') {
      can('manage', 'all');
    } else {
      can('create', App);
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
