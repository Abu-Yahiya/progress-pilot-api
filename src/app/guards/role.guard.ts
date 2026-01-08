import { USER_ROLE } from '@/src/api/user/entities/user.entity';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLE_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<USER_ROLE>(
      ROLE_KEY,
      context.getHandler(),
    );

    if (!requiredRole) true;
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;

    const hasAccess = requiredRole === user.role;

    // if user not exist
    if (!user || !hasAccess) {
      throw new UnauthorizedException(
        'You have no permission in this resource',
      );
    }

    return hasAccess;
  }
}
