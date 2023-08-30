import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequiredRule, CHECK_ABILITY } from './authorization.decorator';
import { AuthorizationFactory } from './authorization.factory';
import { Payload } from './jwt.types';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AuthorizationFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];

    const { user }: { user: Payload } = context.switchToHttp().getRequest();
    if (!user || !user.role) return false;

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