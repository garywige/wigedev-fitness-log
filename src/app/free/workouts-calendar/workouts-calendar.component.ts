import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workouts-calendar',
  templateUrl: './workouts-calendar.component.html',
  styleUrls: ['./workouts-calendar.component.css']
})
export class WorkoutsCalendarComponent implements OnInit {

  title: string = ''

  constructor() { }

  ngOnInit(): void {
    const today = new Date()
    this.title = `${today.toLocaleString('default', {month: 'long'})} ${today.getFullYear()}`
  }

}
