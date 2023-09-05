import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequiredRule, CHECK_ABILITY } from './authorization.decorator';
import { AppAbility, PermissionService } from './permission.service';
import { JWTPayload } from './jwt.types';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules = this.getRules(context);

    const jwtPayload: JWTPayload = this.getPayload(context);
    if (!jwtPayload.user?.role) return false;

    const hasPermission = this.permissionService.getPermission(jwtPayload.user);

    if (!this.isAllowed(rules, hasPermission)) {
      throw new ForbiddenException('Not allowed');
    }
    return true;
  }

  private getRules(context: ExecutionContext): RequiredRule[] {
    return (
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      []
    );
  }

  private getPayload(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  private isAllowed(rules: RequiredRule[], hasPermission: AppAbility) {
    if (rules.some(rule => !hasPermission.can(rule.action, rule.subjects)))
      return false;

    return true;
  }
}
