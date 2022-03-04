import { Component, Inject, OnInit } from '@angular/core'

import { DeleteWorkoutComponent } from './delete-workout/delete-workout.component'
import { EditSetComponent } from './edit-set/edit-set.component'
import { Set } from './set'
import { ExerciseGroup } from './exercise-group'
import { UiService } from 'src/app/common/services/ui/ui.service'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.component.html',
  styleUrls: ['./edit-workout.component.css'],
})
export class EditWorkoutComponent {
  date: Date = new Date()
  groups: ExerciseGroup[] = []
  output: { date: Date; sets: Set[] } | null = null
  isEditMode: boolean = false

  constructor(private uiService: UiService, @Inject(MAT_DIALOG_DATA)data: any) {
    if(data?.date){
      // adjust date to compensate for timezone
      this.date = data.date
      this.date.setUTCHours(this.date.getTimezoneOffset() / 60)
      this.isEditMode = true
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
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // TODO: implement delete workout & close the workout window
        this.uiService.toast('Workout Deleted!')
        this.uiService.closeAllDialogs()
      }
    })
  }

  addSet(set: Set) {
    if (this.groups.filter((group) => group.name === set.exercise).length === 0) {
      // add new group
      this.groups.push(new ExerciseGroup(set.exercise, [set]))
    } else {
      // add to existing group
      this.groups.filter((group) => group.name === set.exercise)[0]?.sets?.push(set)
    }
  }

  onSubmit() {
    // flatten the data
    this.output = {
      date: this.date,
      sets: [],
    }

    this.groups.forEach((group) => {
      group.sets.forEach((set) => {
        this.output?.sets.push(set)
      })
    })

    // send the data to outer space
    console.log(this.output)
  }
}
