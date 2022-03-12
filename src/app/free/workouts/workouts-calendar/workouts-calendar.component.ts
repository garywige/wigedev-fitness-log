import { ApiService, WorkoutSet, WorkoutsElement } from 'src/app/common/services/api/api.service'
import { Component, OnInit } from '@angular/core'
import { catchError, filter, map, of, tap } from 'rxjs'

import { EditWorkoutComponent } from '../edit-workout/edit-workout.component'
import { Month } from './month'
import { Set } from '../edit-workout/set'
import { UiService } from 'src/app/common/services/ui/ui.service'
import { WorkoutService } from 'src/app/common/services/workout/workout.service'

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
  workouts: WorkoutsElement[] = []
  cycleId: string = ''

  constructor(private uiService: UiService, private workoutService: WorkoutService, private api: ApiService) {
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

    // load workouts
    this.workoutService.selectedCycleId$
      .pipe(
        filter((output) => output.length > 0),
        tap((cycleId) => {
          this.cycleId = cycleId
          this.loadData(cycleId)
        })
      )
      .subscribe()
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

  openWorkoutDialog(date?: Date) {
    let ref = this.uiService.showDialog(EditWorkoutComponent, { date: date })
    ref
      .afterClosed()
      .pipe(
        tap(() => {
          // Reload calendar no matter the outcome
          setTimeout(() => this.loadData(this.cycleId), 1000)
        }),
        filter((output) => output),
        map((workout) => {
          let output = {
            date: workout?.date,
            cycleId: this.cycleId,
            sets: [] as WorkoutSet[],
          }

          workout?.sets?.forEach((set: Set) => {
            if (set?.completed) {
              set.completed = +set.completed
            }

            output.sets.push({
              exerciseId: set?.exercise?.id,
              weight: set?.weight,
              unit: set?.unit,
              repsPrescribed: set?.reps,
              repsPerformed: set?.completed,
            })
          })

          return output
        }),
        tap((workout) => {
          if (date) {
            // EDIT MODE

            this.api
              .updateWorkout(date, this.cycleId, workout.sets)
              .pipe(
                tap((result) => {
                  if (result?.message) {
                    this.uiService.toast('An error occurred when saving the workout.')
                  } else {
                    this.uiService.toast('Workout Saved!')
                  }
                })
              )
              .subscribe()
          } else {
            // ADD MODE

            this.api
              .createWorkout(workout.date, this.cycleId, workout.sets)
              .pipe(
                catchError(err => of(err)),
                tap((result) => {
                  if (result?.message) {
                    this.uiService.toast('An error occurred when saving the workout.')
                  } else {
                    this.uiService.toast('Workout Saved!')
                  }
                })
              )
              .subscribe()
          }
        })
      )
      .subscribe()
  }

  loadData(cycleId: string) {
    this.api
      .readWorkouts(cycleId)
      .pipe(
        filter((output) => output !== null),
        tap((output) => {
          if (output?.message) {
            this.uiService.toast('There was an error retrieving workouts.')
          }

          return output
        }),
        filter((output) => (output?.workouts ? true : false)),
        map((output) => {
          let workouts: WorkoutsElement[] = []
          output?.workouts.forEach((workout) => {
            workouts.push({
              date: new Date(workout.date),
              setCount: workout.setCount,
            })
          })

          return workouts
        }),
        tap((output) => {
          this.workouts = output
        })
      )
      .subscribe()
  }

  hasWorkout(year: number, month: number, day: number): boolean {
    let result = false
    this.workouts.forEach((workout) => {
      if (
        workout.date.getUTCFullYear() === year &&
        workout.date.getUTCMonth() === month &&
        workout.date.getUTCDate() === day
      ) {
        result = true
      }
    })

    return result
  }

  convertToDate(year: number, month: number, day: number): Date {
    return new Date(Date.UTC(year, month, day))
  }
}
