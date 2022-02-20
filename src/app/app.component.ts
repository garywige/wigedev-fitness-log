import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { UiService } from './ui/ui.service';
import { Role } from './auth/auth.enum'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'wigedev-fitness-log';

  constructor(private router: Router, private uiService: UiService, public authService: AuthService) {}

  logout() {
    // TODO: invalidate token
    this.authService.logout(true)

    // inform that logout was successful
    this.uiService.toast('Logout Successful!')

    // navigate to login
    this.router.navigate(['/signin']);
  }
}
