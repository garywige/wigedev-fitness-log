import { Component, OnInit } from '@angular/core';

import { DeleteWorkoutComponent } from '../delete-workout/delete-workout.component';
import { EditSetComponent } from '../edit-set/edit-set.component';
import { MatDialog } from '@angular/material/dialog';
import { Set } from '../set';

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.component.html',
  styleUrls: ['./edit-workout.component.css']
})
export class EditWorkoutComponent {

  sets: Set[] = []

  constructor(public dialog: MatDialog) { }

  openSetDialog(){
    let dialogRef = this.dialog.open(EditSetComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.sets.push(result)
      console.log(JSON.stringify(this.sets))
    })
  }

  openDeleteDialog(){
    this.dialog.open(DeleteWorkoutComponent)
  }
}
