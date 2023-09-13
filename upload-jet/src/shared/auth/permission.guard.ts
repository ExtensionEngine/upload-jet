import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Action, Resource, hasPermission } from './authorization';
import { Reflector } from '@nestjs/core';

export const CHECK_PERMISSION = Symbol('check_permission');

export const Permission = (action: Action, resource: Resource) =>
  SetMetadata(CHECK_PERMISSION, { action, resource });

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { permissions } = context.switchToHttp().getRequest<Request>();
    const permissionRequirement = this.reflector.get<{
      action: Action;
      resource: Resource;
    }>(CHECK_PERMISSION, context.getHandler());
    if (!permissionRequirement) return true;
    const { action, resource } = permissionRequirement;
    return hasPermission(permissions, action, resource);
  }
}
