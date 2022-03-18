import { Component, OnInit } from '@angular/core'
import { filter, tap } from 'rxjs'

import { ActivatedRoute } from '@angular/router'
import { ApiService } from '../common/services/api/api.service'

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
})
export class EmailVerificationComponent implements OnInit {
  email: string
  hash: string
  isComplete: boolean = false
  isSuccess: boolean = true

  constructor(route: ActivatedRoute, private api: ApiService) {
    this.email = route.snapshot.params['email'] ?? ''
    this.hash = route.snapshot.queryParams['hash'] ?? ''
  }

  ngOnInit(): void {
    this.api
      .verifyEmail(this.email, this.hash)
      .pipe(
        tap((output) => {
          if (output?.message) {
            this.isComplete = true
            this.isSuccess = false
          }
        }),
        filter((output) => output?.verified !== null),
        tap((output) => {
          this.isComplete = true
          this.isSuccess = output.verified
        })
      )
      .subscribe()
  }
}
