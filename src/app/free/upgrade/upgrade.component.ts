import { Card, Payments, Square } from '@square/web-payments-sdk-types'
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
    type: new FormControl(''),
    name: new FormGroup({
      first: new FormControl(''),
      last: new FormControl('')
    }),
    address: new FormGroup({
      line1: new FormControl(''),
      line2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
      country: new FormControl('')
    })
  })

  constructor() { }

  ngOnInit(): void {
    if(!window.Square){
      throw new Error('Square.js failed to load properly')
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
        console.error('invalid credit card input')
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

      console.log(JSON.stringify(output))
    })
  }
}
