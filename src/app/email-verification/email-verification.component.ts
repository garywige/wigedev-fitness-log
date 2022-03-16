import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent {

  email: string
  hash: string
  isComplete: boolean = false
  isSuccess: boolean = true

  constructor(route: ActivatedRoute) {
    this.email = route.snapshot.params['email'] ?? ''
    this.hash = route.snapshot.queryParams['hash'] ?? ''
  }

}

