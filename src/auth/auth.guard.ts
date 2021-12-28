import { CanActivate, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  // context: ExecutionContext,
  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    // const request: any = context.switchToHttp().getRequest();

    return true;
  }
}
