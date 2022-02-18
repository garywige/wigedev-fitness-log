import { Component, OnInit } from '@angular/core';

import { EditWorkoutComponent } from '../edit-workout/edit-workout.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Workout {
  date: Date
  setCount: number
}

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.css'],
})
export class WorkoutsListComponent {
  displayedColumns: string[] = ['date', 'setCount']

  workouts: Workout[] = [
    {date: new Date(Date.UTC(2022, 1, 10)), setCount: 12},
    {date: new Date(Date.UTC(2022, 1, 12)), setCount: 12}
  ]

  constructor(public dialog: MatDialog, private snackbar: MatSnackBar) {}

  openDialog(){
    let ref = this.dialog.open(EditWorkoutComponent, { width: '600px'})
    ref.afterClosed().subscribe(result => {
      if(result){
        this.openSnackBar('Workout Saved!', 'Close')
      }
    })
  }

  openSnackBar(message: string, action: string){
    this.snackbar.open(message, action, { duration: 3000, panelClass: 'snackbar'})
  }
}
