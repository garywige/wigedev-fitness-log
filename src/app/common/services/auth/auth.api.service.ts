import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { User } from "src/app/user/user/user";
import { ApiService } from "../api/api.service";
import { UiService } from "../ui/ui.service";
import { Role } from "./auth.enum";
import { AuthService, IAuthStatus, IServerAuthResponse } from "./auth.service";

@Injectable()
export class ApiAuthService extends AuthService {

  constructor(private api: ApiService, private uiService: UiService){
    super()
  }

  protected authProvider(email: string, password: string): Observable<IServerAuthResponse> {
    return this.api.signin(email, password).pipe(map(result => {
      let output: string = ''
      if(result?.message){
        this.uiService.toast('The uername or password is incorrect.')
      }
      else {
        output = result?.accessToken
      }

      return {
        accessToken: output
      }
    }))
  }

  protected transformJwtToken(token: TokenPackage): IAuthStatus {
    return {
      isAuthenticated: true,
      userRole: token?.role,
      userId: token?.email
    }
  }

  protected getCurrentUser(): Observable<User> {
    return this.authStatus$.pipe(map(status => {
      return User.Build({
        id: status?.userId,
        email: status?.userId,
        role: status?.userRole,
        created: new Date(),
        paidThrough: new Date(),
        emailVerified: false
      })
    }))
  }

}

interface TokenPackage {
  id: string,
  email: string,
  role: Role
}
