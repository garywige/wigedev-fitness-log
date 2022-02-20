import { Injectable } from '@angular/core'
import { BehaviorSubject, catchError, filter, map, mergeMap, Observable, pipe, tap, throwError } from 'rxjs'
import { Role } from './auth.enum'
import { IUser, User } from '../../../user/user/user'
import jwtDecode from 'jwt-decode'
import { transformError } from '../../common'
import { CacheService } from './cache.service'

export interface IAuthStatus {
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
  userId: '',
}

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>
  readonly currentUser$: BehaviorSubject<IUser>
  login(email: string, password: string): Observable<void>
  logout(clearToken?: boolean): void
  getToken(): string
}

@Injectable()
export abstract class AuthService extends CacheService implements IAuthService {
  private getAndUpdateUserIfAuthenticated = pipe(
    filter((status: IAuthStatus) => status.isAuthenticated),
    mergeMap(() => this.getCurrentUser()),
    map((user: IUser) => this.currentUser$.next(user)),
    catchError(transformError)
  )

  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthStatus)
  readonly currentUser$ = new BehaviorSubject<IUser>(new User())
  protected readonly resumeCurrentUser$ = this.authStatus$.pipe(this.getAndUpdateUserIfAuthenticated)

  constructor() {
    super()
    if (this.hasExpiredToken()) {
      this.logout(true)
    } else {
      this.authStatus$.next(this.getAuthStatusFromToken())
      setTimeout(() => this.resumeCurrentUser$.subscribe(), 0)
    }
  }

  login(email: string, password: string): Observable<void> {
    this.clearToken()

    const loginResponse$ = this.authProvider(email, password).pipe(
      map((value) => {
        this.setToken(value.accessToken)
        return this.getAuthStatusFromToken()
      }),
      tap((status) => this.authStatus$.next(status)),
      this.getAndUpdateUserIfAuthenticated
    )

    loginResponse$.subscribe({
      error: (err) => {
        this.logout()
        return throwError(() => err)
      },
    })

    return loginResponse$
  }

  logout(clearToken?: boolean): void {
    if (clearToken) {
      this.clearToken()
    }

    setTimeout(() => this.authStatus$.next(defaultAuthStatus), 0)
  }

  protected setToken(jwt: string) {
    this.setItem('jwt', jwt)
  }

  getToken(): string {
    return this.getItem('jwt') ?? ''
  }

  protected clearToken() {
    this.removeItem('jwt')
  }

  protected hasExpiredToken(): boolean {
    const jwt = this.getToken()
    if (jwt) {
      const payload = jwtDecode(jwt) as any
      return Date.now() >= payload.exp * 1000
    }

    return true
  }

  protected getAuthStatusFromToken(): IAuthStatus {
    return this.transformJwtToken(jwtDecode(this.getToken()))
  }

  protected abstract authProvider(email: string, password: string): Observable<IServerAuthResponse>
  protected abstract transformJwtToken(token: unknown): IAuthStatus
  protected abstract getCurrentUser(): Observable<User>
}
