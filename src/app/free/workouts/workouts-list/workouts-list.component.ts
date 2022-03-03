import { Component, OnInit } from '@angular/core'

import { EditWorkoutComponent } from '../edit-workout/edit-workout.component'
import { UiService } from 'src/app/common/services/ui/ui.service'
import { WorkoutService } from 'src/app/common/services/workout/workout.service'
import { filter, tap } from 'rxjs'
import { ApiService } from 'src/app/common/services/api/api.service'
import { MatTableDataSource } from '@angular/material/table'

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

  constructor(private uiService: UiService, private workoutService: WorkoutService, private api: ApiService) {}

  ngOnInit(): void {
    this.workoutService.selectedCycleId$.pipe(tap(cycleId => {
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

  openDialog(id: number) {
    let ref = this.uiService.showDialog(EditWorkoutComponent, id)
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.uiService.toast('Workout Saved!')
      }
    })
  }
}
