import { Component, OnInit } from '@angular/core'

import { EditWorkoutComponent } from '../edit-workout/edit-workout.component'
import { Month } from './month'
import { UiService } from 'src/app/common/services/ui/ui.service'

@Component({
  selector: 'app-workouts-calendar',
  templateUrl: './workouts-calendar.component.html',
  styleUrls: ['./workouts-calendar.component.css'],
})
export class WorkoutsCalendarComponent implements OnInit {
  today: Date = new Date()
  selectedMonth: number = 0
  selectedYear: number = 0
  months: Array<Month>
  weeks: Array<Array<number>>

  constructor(private uiService: UiService) {
    this.selectedYear = new Date().getFullYear()

    this.months = [
      new Month('January', 31),
      new Month('February', this.selectedYear % 4 === 0 ? 29 : 28),
      new Month('March', 31),
      new Month('April', 30),
      new Month('May', 31),
      new Month('June', 30),
      new Month('July', 31),
      new Month('August', 31),
      new Month('September', 30),
      new Month('October', 31),
      new Month('November', 30),
      new Month('December', 31),
    ]

    this.weeks = []
  }

  ngOnInit(): void {
    // set current month as selected month
    this.selectedMonth = this.today.getMonth()

    // generate calendar
    this.generateCalendar()
  }

  generateCalendar() {
    // determine what day the 1st falls on
    let first = new Date(this.selectedYear, this.selectedMonth, 1)

    // generate array of weeks that the calendar can use
    this.weeks = new Array()
    this.weeks.push(new Array(7))
    let day = 1
    for (let i = first.getDay(); i < 7; i++) {
      this.weeks[0][i] = day++
    }

    while (day <= this.months[this.selectedMonth].days) {
      this.weeks.push(new Array(7))

      for (let i = 0; i < 7; i++) {
        this.weeks[this.weeks.length - 1][i] = day++
        if (day > this.months[this.selectedMonth].days) {
          break
        }
      }
    }
  }

  monthBack() {
    this.selectedMonth--

    if (this.selectedMonth < 0) {
      this.selectedMonth = 11
      this.selectedYear--
    }

    this.generateCalendar()
  }

  monthForward() {
    this.selectedMonth++

    if (this.selectedMonth > 11) {
      this.selectedMonth = 0
      this.selectedYear++
    }

    this.generateCalendar()
  }

  openWorkoutDialog(id: number) {
    let ref = this.uiService.showDialog(EditWorkoutComponent, id)
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.uiService.toast('Workout Saved!')
      }
    })
  }
}
