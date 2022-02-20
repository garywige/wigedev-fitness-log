import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { combineLatest, filter, tap } from 'rxjs'
import { AuthService } from '../common/services/auth/auth.service'
import { UiService } from '../common/services/ui/ui.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/[a-z]+/),
      Validators.pattern(/[A-Z]+/),
      Validators.pattern(/[0-9]+/),
      Validators.pattern(/[^a-zA-Z0-9]+/),
    ]),
  })

  constructor(private uiService: UiService, private router: Router, private authService: AuthService) {}

  onSubmit() {
    // simulate authService
    this.authService.login('free@test.com', '12345678')
    combineLatest([this.authService.authStatus$, this.authService.currentUser$])
      .pipe(
        filter(([authStatus, user]) => authStatus.isAuthenticated && user?.id !== ''),
        tap(([authStatus, user]) => {
          // display message on successful sign in
          this.uiService.toast('Welcome to WFL!')

          // navigate to the workouts page
          this.router.navigate(['/free'])
        })
      )
      .subscribe()
  }
}
