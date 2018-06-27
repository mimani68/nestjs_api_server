import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthService } from './../services/auth/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly _authService: AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // get automatic roles label from decorator
    const roles = this.reflector.get<Array<string>>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    // get header request
    const request = context.switchToHttp().getRequest();
    // console.log('role.can-active.ts :: canActive() :: request.headers.authorization >> ', request.headers.authorization );
    const token: string = request.headers.authorization.split(' ')[1];
    // console.log('role.can-active.ts :: canActive() :: token >> ', token );

    // authorization processs
    const user = await this._authService.validateUser( token );
    console.log('role.can-active.ts :: canActive() :: user >> ', user );

    const hasRole = () => roles.some( o => o === user.role ) ;
    // return user && user.role && user.role === 'admin'  ? true : null;
    return user && user.role && hasRole();
  }
}