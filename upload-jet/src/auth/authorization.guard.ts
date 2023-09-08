import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequiredRule, CHECK_ABILITY } from './authorization.decorator';
import { AppAbility, PermissionService } from './permission.service';
import { User } from './auth.entities';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules = this.getRules(context);

    const user: User = this.getUser(context);
    if (!user?.role) return false;

    const permissions = this.permissionService.getPermission(user);

    if (!this.isAllowed(rules, permissions)) {
      throw new ForbiddenException('Not allowed');
    }
    return true;
  }

  private getRules(context: ExecutionContext): RequiredRule[] {
    const rules = this.reflector.get<RequiredRule[]>(
      CHECK_ABILITY,
      context.getHandler()
    );
    return rules || [];
  }

  private getUser(context: ExecutionContext) {
    return context.switchToHttp().getRequest().user;
  }

  private isAllowed(rules: RequiredRule[], permissions: AppAbility) {
    return !rules.some(rule => !permissions.can(rule.action, rule.subjects));
  }
}
