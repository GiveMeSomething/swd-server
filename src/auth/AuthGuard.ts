import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Response = context.switchToHttp().getRequest();

    // TOOD: Verify and decode JWT to find out user type

    return true;
  }
}
