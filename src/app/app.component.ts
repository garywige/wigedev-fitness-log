import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'wigedev-fitness-log';

  constructor(private router: Router, private snackbar: MatSnackBar, public authService: AuthService) {}

  logout() {
    // TODO: invalidate token
    this.authService.logout(true)

    // inform that logout was successful
    this.snackbar.open('Logout Successful!', 'Close', { duration: 3000, panelClass: 'snackbar' });

    // navigate to login
    this.router.navigate(['/signin']);
  }
}
