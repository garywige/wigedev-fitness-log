import { Observable } from 'rxjs';
import { AuthService, IAuthStatus, IServerAuthResponse } from '../services/auth/auth.service'
import { User } from '../../user/user/user';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthServiceFake extends AuthService {

  constructor(){
    super()
  }

  override login(email: string, password: string): Observable<void> {
      return new Observable<void>()
  }

  override logout(clearToken?: boolean): void {
      return
  }

  override getToken(): string {
      return 'testing...'
  }

  override hasExpiredToken(): boolean {
      return true
  }

  protected authProvider(email: string, password: string): Observable<IServerAuthResponse> {
    throw new Error('Method not implemented.');
  }
  protected transformJwtToken(token: unknown): IAuthStatus {
    throw new Error('Method not implemented.');
  }
  protected getCurrentUser(): Observable<User> {
    throw new Error('Method not implemented.');
  }

}
