import { Component, Inject, OnInit } from '@angular/core'

import { DeleteWorkoutComponent } from './delete-workout/delete-workout.component'
import { EditSetComponent } from './edit-set/edit-set.component'
import { Set } from './set'
import { ExerciseGroup } from './exercise-group'
import { UiService } from 'src/app/common/services/ui/ui.service'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ApiService } from 'src/app/common/services/api/api.service'
import { WorkoutService } from 'src/app/common/services/workout/workout.service'
import { filter, tap } from 'rxjs'

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.component.html',
  styleUrls: ['./edit-workout.component.css'],
})
export class EditWorkoutComponent implements OnInit {
  date: Date = new Date()
  groups: ExerciseGroup[] = []
  output: { date: Date; sets: Set[] } = { date: new Date('1970-01-01'), sets: [] }
  isEditMode: boolean = false
  cycleId: string = ''

  constructor(
    private uiService: UiService,
    @Inject(MAT_DIALOG_DATA) data: any,
    private api: ApiService,
    private workoutService: WorkoutService
  ) {
    if (data?.date) {
      // adjust date to compensate for timezone
      this.date = data.date
      this.date.setUTCHours(this.date.getTimezoneOffset() / 60)
      this.isEditMode = true
    }
  }

  ngOnInit() {
    if (this.isEditMode) {
      // load the workout into the form
      this.workoutService.selectedCycleId$
        .pipe(
          filter((cycleId) => cycleId?.length > 0),
          tap((cycleId) => {
            this.cycleId = cycleId

            this.api
              .readWorkout(this.date, cycleId)
              .pipe(
                filter((output) => (output?.message ? false : true)),
                tap((workout) => {
                  workout?.sets?.forEach((set) => {
                    this.addSet({
                      exercise: set?.exercise,
                      weight: set?.weight,
                      unit: set?.unit,
                      reps: set?.repsPrescribed,
                      completed: set?.repsPerformed,
                    })
                  })
                })
              )
              .subscribe()
          })
        )
        .subscribe()
    }
  }

  openSetDialog() {
    let dialogRef = this.uiService.showDialog(EditSetComponent, null, true)
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.addSet(result)
    })
  }

  openDeleteDialog() {
    let dialogRef = this.uiService.showDialog(DeleteWorkoutComponent, null, true)
    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => result),
        tap(() => {
          this.api
            .deleteWorkout(this.date, this.cycleId)
            .pipe(
              tap((result) => {
                this.uiService.toast('Workout Deleted!')
                this.uiService.closeAllDialogs()
              })
            )
            .subscribe()
        })
      )
      .subscribe()
  }

  addSet(set: Set) {
    if (this.groups.filter((group) => group.name === set.exercise?.name).length === 0) {
      // add new group
      this.groups.push(new ExerciseGroup(set.exercise?.name, [set]))
    } else {
      // add to existing group
      this.groups.filter((group) => group.name === set.exercise?.name)[0]?.sets?.push(set)
    }
  }

  onSubmit() {
    // flatten the data
    this.output.date = this.date

    this.groups.forEach((group) => {
      group.sets.forEach((set) => {
        this.output?.sets.push(set)
      })
    })
  }
}
