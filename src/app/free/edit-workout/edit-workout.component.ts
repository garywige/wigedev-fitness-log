import { Component, OnInit } from '@angular/core';

import { EditSetComponent } from '../edit-set/edit-set.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.component.html',
  styleUrls: ['./edit-workout.component.css']
})
export class EditWorkoutComponent {

  constructor(public dialog: MatDialog) { }

  openDialog(){
    this.dialog.open(EditSetComponent)
  }
}
