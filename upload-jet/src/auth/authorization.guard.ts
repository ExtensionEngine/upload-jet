import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from './auth.types';
import { Payload } from './jwt.dto';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requirePermissions = this.reflector.getAllAndOverride<Permission[]>(
      'permissions',
      [context.getHandler()]
    );

    if (!requirePermissions.length) {
      return true;
    }

    const { user }: { user: Payload } = context.switchToHttp().getRequest();

    if (!user || !user.permissions) return false;

    return requirePermissions.some(permission =>
      user.permissions.includes(permission)
    );
  }
}
