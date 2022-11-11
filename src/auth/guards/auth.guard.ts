import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Response = context.switchToHttp().getRequest();

    // TOOD: Verify and decode JWT to find out user type
    const authToken = request.headers.get('Authorization');
    if (!authToken) {
      return false;
    }

    return this.checkJwt(authToken);
  }

  async checkJwt(jwt: string): Promise<boolean> {
    const isJwtValid = this.jwtService.verifyAsync(jwt);
    if (!isJwtValid) {
      return false;
    }

    const userInfo = this.jwtService.decode(jwt);
    if (!userInfo || !userInfo['role']) {
      return false;
    }

    return true;
  }
}
