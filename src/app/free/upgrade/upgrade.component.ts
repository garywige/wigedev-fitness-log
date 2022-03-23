import { Card, Payments, Square } from '@square/web-payments-sdk-types'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {

  private appId = 'sandbox-sq0idb-Cev7uB4UAAPhOfL4ZWRKMQ'
  private locationId = 'LNXH23P4CY14T'

  constructor() { }

  ngOnInit(): void {
    if(!window.Square){
      throw new Error('Square.js failed to load properly')
    }

    const payments = window.Square.payments(this.appId, this.locationId)
    let card: Card

    this.initializeCard(payments).then(output => {
      card = output

      // TODO: Create card payment
    }).catch(e => console.error('Initializing card failed', e))
  }

  async initializeCard(payments: Payments): Promise<Card>{
    const card = await payments.card()
    await card.attach('#card-container')
    return card
  }
}
