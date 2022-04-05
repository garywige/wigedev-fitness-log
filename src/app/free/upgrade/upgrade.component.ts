import { Card, Payments, Square } from '@square/web-payments-sdk-types'
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiService } from 'src/app/common/services/ui/ui.service';
import { ApiService } from 'src/app/common/services/api/api.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {

  private appId = 'sandbox-sq0idb-Cev7uB4UAAPhOfL4ZWRKMQ'
  private locationId = 'LNXH23P4CY14T'
  private card = <Card>{}

  form = new FormGroup({
    type: new FormControl('', [Validators.required, Validators.pattern(/^[a-z]+$/)]),
    name: new FormGroup({
      first: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z-]+$/)]),
      last: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z-]+$/)])
    }),
    address: new FormGroup({
      line1: new FormControl('', [Validators.required]),
      line2: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
      country: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]{2}$/)])
    })
  })

  constructor(private uiService: UiService, private api: ApiService) { }

  ngOnInit(): void {
    if(!window.Square){
      console.log('Square.js failed to load properly!')
      return
    }

    const payments = window.Square.payments(this.appId, this.locationId)

    this.initializeCard(payments).then(output => {
      this.card = output

      // TODO: Create card payment
    }).catch(e => console.error('Initializing card failed', e))
  }

  async initializeCard(payments: Payments): Promise<Card>{
    const card = await payments.card()
    await card.attach('#card-container')
    return card
  }

  onSubmit(){

    this.card.tokenize().then(token => {
      if(token.status !== 'OK'){
        this.uiService.toast('Please enter a valid credit card')
        return
      }

      const output = {
        type: this.form.get('type')?.value,
        card: token.token,
        name: {
          first: this.form.get('name')?.get('first')?.value,
          last: this.form.get('name')?.get('last')?.value
        },
        address: {
          line1: this.form.get('address')?.get('line1')?.value,
          line2: this.form.get('address')?.get('line2')?.value,
          city: this.form.get('address')?.get('city')?.value,
          state: this.form.get('address')?.get('state')?.value,
          zip: this.form.get('address')?.get('zip')?.value,
          country: this.form.get('address')?.get('country')?.value
        }
      }

      this.api.upgrade(output as any).pipe(
        tap(output => {
          console.log(JSON.stringify(output))
        })
      ).subscribe()
    })
  }
}
