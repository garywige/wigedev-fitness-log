import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Role } from './auth.enum';
import { IUser } from '../user/user/user';
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
export class AuthService {

  constructor() { }
}
