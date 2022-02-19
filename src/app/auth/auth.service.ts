import { Injectable } from '@angular/core';
import { Role } from './auth.enum';

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

@Injectable()
export class AuthService {

  constructor() { }
}
