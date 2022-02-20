import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { map, Observable, take } from 'rxjs'
import { UiService } from '../ui/ui.service'
import { Role } from './auth.enum'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  constructor(protected authService: AuthService, protected router: Router, private uiService: UiService) {}

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin()
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(route)
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(childRoute)
  }

  protected checkLogin(route?: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.authStatus$.pipe(
      map((authStatus) => {
        const roleMatch = this.checkRoleMatch(authStatus.userRole, route)
        const allowLogin = authStatus.isAuthenticated && roleMatch
        if (!allowLogin) {
          this.showAlert(authStatus.isAuthenticated, roleMatch)
          this.router.navigate(['signin'], { queryParams: { redirectUrl: this.getResolvedUrl(route) } })
        }

        return allowLogin
      }),
      take(1)
    )
  }

  private checkRoleMatch(role: Role, route?: ActivatedRouteSnapshot) {
    if (!route?.data['expectedRole']) {
      return true
    }

    return role === route.data['expectedRole']
  }

  private showAlert(isAuth: boolean, roleMatch: boolean) {
    if (!isAuth) {
      this.uiService.toast('You must login to continue')
    }

    if (!roleMatch) {
      this.uiService.toast('You do not have the permissions to view this resource')
    }
  }

  getResolvedUrl(route?: ActivatedRouteSnapshot): string {
    if (!route) {
      return ''
    }

    return route.pathFromRoot
      .map((r) => r.url.map((segment) => segment.toString()).join('/'))
      .join('/')
      .replace('//', '/')
  }
}
