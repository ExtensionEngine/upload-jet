import { SetMetadata } from '@nestjs/common';
import { Action, Subjects } from 'auth/auth.types';

export type RequiredRule = {
  action: Action;
  subjects: Subjects;
};

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);
