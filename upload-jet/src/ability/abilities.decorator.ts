import { SetMetadata } from '@nestjs/common';
import { Action, Subjects } from './ability.factory';

export type RequiredRule = {
  action: Action;
  subjects: Subjects;
};

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);
