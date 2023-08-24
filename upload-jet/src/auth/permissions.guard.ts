import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AllPermissions } from './auth.dto';
import { payloadType } from './jwt.dto';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requirePermissions = this.reflector.getAllAndOverride<
      AllPermissions[]
    >('permissions', [context.getHandler(), context.getClass()]);

    if (!requirePermissions.length) {
      return true;
    }

    const { user }: { user: payloadType } = context.switchToHttp().getRequest();

    if (!user || !user.permission) return false;

    return requirePermissions.some(permission =>
      user.permission.includes(permission)
    );
  }
}
