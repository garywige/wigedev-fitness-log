import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Component } from '@angular/core'
import { SignUpVerificationComponent } from './sign-up-verification/sign-up-verification.component'
import { Router } from '@angular/router'
import { UiService } from '../common/services/ui/ui.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(8)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/[a-z]+/),
      Validators.pattern(/[A-Z]+/),
      Validators.pattern(/[0-9]+/),
      Validators.pattern(/[^a-zA-Z0-9]+/),
    ]),
    confirm: new FormControl('', [Validators.required, Validators.minLength(8)]),
    type: new FormControl('', Validators.required),
  })

  constructor(private uiService: UiService, private router: Router) {}

  onSubmit() {
    // verify that passwords match
    if (this.form.get('password')?.value !== this.form.get('confirm')?.value) {
      this.uiService.toast('Passwords do not match.')
      return
    }

    // send data
    const output = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      type: this.form.get('type')?.value,
    }

    console.log(output)

    let ref = this.uiService.showDialog(SignUpVerificationComponent, { email: output.email })
    ref.afterClosed().subscribe((result) => {
      if (result) {
        // navigate to Sign In
        this.router.navigate(['/signin'])
      }
    })
  }
}
