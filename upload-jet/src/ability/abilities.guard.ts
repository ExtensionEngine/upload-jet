import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MockedUser } from 'auth/auth.controller';
import { RequiredRule, CHECK_ABILITY } from './abilities.decorator';
import { AbilityFactory } from './ability.factory';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AbilityFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];
    const user = MockedUser;
    const ability = this.caslAbilityFactory.defineAbility(user);

    rules.forEach(rule => {
      const isAllowed = ability.can(rule.action, rule.subjects);
      if (!isAllowed) {
        throw new ForbiddenException('Not allowed');
      }
    });
    return true;
  }
}
