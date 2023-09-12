import { SetMetadata } from '@nestjs/common';
import { Action } from './auth.types';
type Subject = any;

export type RequiredRule = {
  action: Action;
  subjects: Subject;
};

export const CHECK_ABILITY = Symbol('check_ability');

export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);
