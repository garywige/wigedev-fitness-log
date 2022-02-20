import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-sign-up-verification',
  templateUrl: './sign-up-verification.component.html',
  styleUrls: ['./sign-up-verification.component.css'],
})
export class SignUpVerificationComponent {
  email: string = ''

  constructor(@Inject(MAT_DIALOG_DATA) data: { email: string }) {
    this.email = data.email
  }
}
