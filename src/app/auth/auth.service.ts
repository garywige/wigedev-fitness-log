import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Role } from './auth.enum';
import { IUser, User } from '../user/user/user';
import { Observable } from 'rxjs';

export interface IAuthStatus{
  isAuthenticated: boolean
  userRole: Role
  userId: string
}

export interface IServerAuthResponse {
  accessToken: string
}

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: ''
}

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>
  readonly currentUser$: BehaviorSubject<IUser>
  login(email: string, password: string): Observable<void>
  logout(clearToken?: boolean): void
  getToken(): string
}

@Injectable()
export abstract class AuthService implements IAuthService {

  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthStatus)
  readonly currentUser$ = new BehaviorSubject<IUser>(new User())

  constructor() { }

  login(email: string, password: string): Observable<void> {
    throw new Error('Method not implemented.');
  }
  logout(clearToken?: boolean): void {
    throw new Error('Method not implemented.');
  }
  getToken(): string {
    throw new Error('Method not implemented.');
  }

  protected abstract authProvider(email: string, password: string): Observable<IServerAuthResponse>
  protected abstract transformJwtToken(token: unknown): IAuthStatus
  protected abstract getCurrentUser(): Observable<User>
}
