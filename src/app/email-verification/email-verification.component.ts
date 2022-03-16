import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent {

  email: string
  hash: string

  constructor(route: ActivatedRoute) {
    this.email = route.snapshot.params['email'] ?? ''
    this.hash = route.snapshot.queryParams['hash'] ?? ''
  }

}

