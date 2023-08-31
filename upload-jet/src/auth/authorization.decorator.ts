import { SetMetadata } from '@nestjs/common';
import { Action, Subjects } from './auth.types';

export type RequiredRule = {
  action: Action;
  subjects: Subjects;
};

export const CHECK_ABILITY = Symbol('check_ability');

export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);
