import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { permissions } from './auth.dto';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requirePermissions = this.reflector.getAllAndOverride<permissions[]>(
      'permissions',
      [context.getHandler(), context.getClass()]
    );
    const { user } = context.switchToHttp().getRequest();
    return requirePermissions.some(permission =>
      user.permission.includes(permission)
    );
  }
}
