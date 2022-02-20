import { Injectable } from '@angular/core';
import { AuthService, IAuthStatus, IServerAuthResponse } from './auth.service';
import { sign } from 'fake-jwt-sign'
import { Observable, of, throwError } from 'rxjs';
import { User } from '../user/user/user';
import { Role } from './auth.enum';

@Injectable()
export class InMemoryAuthService extends AuthService {

  private defaultUser = new User()

  constructor() {
    super()
    console.warn('You\'re using the InMemoryAuthService. Do not use this service in production.')
  }

  protected authProvider(email: string, password: string): Observable<IServerAuthResponse> {
      email = email.toLowerCase()

      if(!email.endsWith('@test.com')){
        return throwError(() => 'Failed to login! Email needs to end with @test.com.')
      }

      const authStatus = {
        isAuthenticated: true,
        userId: this.defaultUser.id,
        userRole: email.includes('pro')
          ? Role.Pro : email.includes('free')
          ? Role.Free : Role.None,
      } as IAuthStatus

      this.defaultUser.role = authStatus.userRole

      const authResponse = {
        accessToken: sign(authStatus, 'secret', {
          expiresIn: '1h',
          algorithm: 'none'
        })
      } as IServerAuthResponse

      return of(authResponse)
  }

  protected transformJwtToken(token: IAuthStatus): IAuthStatus {
      return token
  }
}
