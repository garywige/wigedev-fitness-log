import { Component, OnInit } from '@angular/core';

import { EditWorkoutComponent } from '../edit-workout/edit-workout.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.css'],
})
export class WorkoutsListComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(){
    this.dialog.open(EditWorkoutComponent)
  }
}
