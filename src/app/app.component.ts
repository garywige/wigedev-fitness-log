import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from './common/services/auth/auth.service'
import { UiService } from './common/services/ui/ui.service'
import { Role } from './common/services/auth/auth.enum'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router, private uiService: UiService, public authService: AuthService) {}

  logout() {
    // TODO: invalidate token
    this.authService.logout(true)

    // inform that logout was successful
    this.uiService.toast('Logout Successful!')

    // navigate to login
    this.router.navigate(['/signin'])
  }
}
