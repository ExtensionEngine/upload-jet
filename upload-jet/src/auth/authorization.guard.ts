import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequiredRule, CHECK_ABILITY } from './authorization.decorator';
import { PermissionService } from './permission.service';
import { JWTPayload } from './jwt.types';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules = this.getRules(context);

    const { user }: { user: JWTPayload } = context.switchToHttp().getRequest();
    if (!user?.role) return false;

    const hasPermission = this.permissionService.getPermission(user);

    rules.forEach(rule => {
      const isAllowed = hasPermission.can(rule.action, rule.subjects);
      if (!isAllowed) {
        throw new ForbiddenException('Not allowed');
      }
    });
    return true;
  }

  private getRules(context: ExecutionContext): RequiredRule[] {
    return (
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      []
    );
  }
}
