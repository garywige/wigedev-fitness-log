import { Component, OnInit } from '@angular/core';

class Month {
  name: string
  days: number

  constructor(name: string, days: number){
    this.name = name
    this.days = days
  }
}
@Component({
  selector: 'app-workouts-calendar',
  templateUrl: './workouts-calendar.component.html',
  styleUrls: ['./workouts-calendar.component.css']
})
export class WorkoutsCalendarComponent implements OnInit {

  title: string = ''
  today: Date = new Date()
  selectedMonth: number = 0
  months: Array<Month>
  weeks: Array<Array<number>>

  constructor() {
    this.months = [
      new Month('January', 31),
      new Month('February', (new Date()).getFullYear() % 4 === 0 ? 29 : 28),
      new Month('March', 31),
      new Month('April', 30),
      new Month('May', 31),
      new Month('June', 30),
      new Month('July', 31),
      new Month('August', 31),
      new Month('September', 30),
      new Month('October', 31),
      new Month('November', 30),
      new Month('December', 31)
    ]

    this.weeks = []
  }

  ngOnInit(): void {
    this.title = `${this.today.toLocaleString('default', {month: 'long'})} ${this.today.getFullYear()}`

    // set current month as selected month
    this.selectedMonth = this.today.getMonth()

    // determine what day the 1st falls on
    let first = new Date(this.today.getFullYear(), this.today.getMonth(), 1)

    // generate array of weeks that the calendar can use
    this.weeks.push(new Array(7))
    let day = 1
    for(let i = first.getDay(); i < 7; i++){
      this.weeks[0][i] = day++
    }

    while(day <= this.months[this.selectedMonth].days){

      this.weeks.push(new Array(7))

      for(let i = 0; i < 7; i++){
        this.weeks[this.weeks.length - 1][i] = day++
        if(day > this.months[this.selectedMonth].days){
          break
        }
      }
    }
  }

}
