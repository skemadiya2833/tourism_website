import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    let roles = this.reflector.get(Roles, context.getHandler());

    if (!user && !roles.some((role) => role === user.role)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
