import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { permissionsType } from './auth.dto';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requirePermissions = this.reflector.getAllAndOverride<
      permissionsType[]
    >('permissions', [context.getHandler(), context.getClass()]);

    if (!requirePermissions.length) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requirePermissions.some(permission =>
      user.permission.includes(permission)
    );
  }
}
