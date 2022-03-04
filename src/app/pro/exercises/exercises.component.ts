import { Component, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { filter, map, tap } from 'rxjs'
import { ApiService, readExercisesElement, readExercisesOutput } from 'src/app/common/services/api/api.service'
import { UiService } from 'src/app/common/services/ui/ui.service'
import { WorkoutService } from 'src/app/common/services/workout/workout.service'
import { EditExerciseComponent } from './edit-exercise/edit-exercise.component'


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
})
export class ExercisesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'setCount']

  exercises: MatTableDataSource<readExercisesElement> = new MatTableDataSource()
  cycleId: string = ''

  constructor(private uiService: UiService, private api: ApiService, private workoutService: WorkoutService) {}

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.api.readExercises().pipe(
      map( (output: readExercisesOutput) => {
        if(output?.message){
          this.uiService.toast('An error occurred retrieving exercises.')
          return null
        }

        return output
      }),
      filter(data => data !== null),
      tap(exercises => {
        this.exercises.data = exercises?.exercises as readExercisesElement[]
      })
    ).subscribe()
  }

  openExerciseDialog(id?: string) {
    let dialogRef = this.uiService.showDialog(EditExerciseComponent, {id: id})
    dialogRef.afterClosed().pipe(
      tap(output => {
        setTimeout(() => this.loadData(), 1000)

        return output
      }),
      filter(output => output),
      tap(formData => {
        console.log(JSON.stringify(formData))
      })
    ).subscribe()
  }
}
