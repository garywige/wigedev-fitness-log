import { Component, OnInit } from '@angular/core'

import { EditWorkoutComponent } from '../edit-workout/edit-workout.component'
import { UiService } from 'src/app/common/services/ui/ui.service'
import { WorkoutService } from 'src/app/common/services/workout/workout.service'
import { filter, map, tap } from 'rxjs'
import { ApiService } from 'src/app/common/services/api/api.service'
import { MatTableDataSource } from '@angular/material/table'
import { createWorkoutSet } from '../../../common/services/api/api.service'
import { Set } from '../edit-workout/set'

interface Workout {
  date: Date
  setCount: number
}

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.css'],
})
export class WorkoutsListComponent implements OnInit {
  displayedColumns: string[] = ['date', 'setCount']
  dataSource: MatTableDataSource<Workout> = new MatTableDataSource()

  workouts: Workout[] = []
  cycleId: string = ''

  constructor(private uiService: UiService, private workoutService: WorkoutService, private api: ApiService) {}

  ngOnInit(): void {
    this.workoutService.selectedCycleId$.pipe(tap(cycleId => {
      this.cycleId = cycleId
      this.loadData(cycleId)
    })).subscribe()
  }

  loadData(cycleId: string) {

    this.api.readWorkouts(cycleId).pipe(
      filter(result => result !== null),
      tap(result => {
      if(result?.message){
        this.uiService.toast('There was an error retrieving workouts.')
        return
      }

      this.workouts.length = 0
      result?.workouts.forEach(workout => {
        this.workouts.push({
          date: new Date(workout.date),
          setCount: workout.setCount
        })
      })

      this.dataSource.data = this.workouts

    })).subscribe()
  }

  openDialog(date?: Date) {
    let ref = this.uiService.showDialog(EditWorkoutComponent, { date: date})
    ref.afterClosed().pipe(
      tap(data => {
        setTimeout(() => this.loadData(this.cycleId), 1000)
        return data
      }),
      filter(possiblynull => possiblynull),
      map(form => {

        let sets: createWorkoutSet[] = []
        form?.sets?.forEach((set: Set) => {
          sets.push({
            exerciseId: set?.exercise?.id,
            weight: set?.weight,
            unit: set?.unit,
            repsPrescribed: set?.reps,
            repsPerformed: set?.completed
          })
        })

        let output = {
          date: form?.date,
          cycleId: form?.cycleId,
          sets: sets
        }

        return output

      }),
      tap(workout => {
        if(date){
          // EDIT MODE
          this.api.updateWorkout(date, this.cycleId, workout.sets).pipe(
            tap(output => {
              if(output?.message){
                this.uiService.toast('An error occurred when saving the workout.')
                return null
              }

              return output
            }),
            filter(data => data !== null),
            tap(() => {
              this.uiService.toast('Workout Saved!')
            })
          ).subscribe()

        } else {
          // ADD MODE
          this.api.createWorkout(workout?.date, this.cycleId, workout.sets).pipe(
            tap(output => {
              if(output?.message){
                this.uiService.toast('An error occurred when saving the workout.')
                return null
              }

              return output
            }),
            filter(data => data !== null),
            tap(() => {
              this.uiService.toast('Workout Saved!')
            })
          ).subscribe()
        }
      })
    ).subscribe()
  }
}
