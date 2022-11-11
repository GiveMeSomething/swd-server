import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

export class RoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Response = context.switchToHttp().getRequest();

    // TOOD: Verify and decode JWT to find out user type
    const authToken = request.headers.get('Authorization');
    if (!authToken) {
      return false;
    }

    const requestedRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    const userRole = await this.checkRole(authToken);
    if (!userRole) {
      return false;
    }

    return this.matchRoles(requestedRoles, userRole);
  }

  async checkRole(jwt: string): Promise<string> {
    const isJwtValid = this.jwtService.verifyAsync(jwt);
    if (!isJwtValid) {
      return undefined;
    }

    const userInfo = this.jwtService.decode(jwt);
    if (!userInfo || !userInfo['role']) {
      return undefined;
    }

    return userInfo['role'];
  }

  matchRoles(requestedRoles: string[], userRole: string): boolean {
    if (!requestedRoles) {
      return true;
    }

    return requestedRoles.includes(userRole);
  }
}
