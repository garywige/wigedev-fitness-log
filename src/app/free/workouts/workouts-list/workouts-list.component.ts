import { Component, OnInit } from '@angular/core';

import { EditWorkoutComponent } from '../edit-workout/edit-workout.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Workout {
  id: number;
  date: Date;
  setCount: number;
}

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.css'],
})
export class WorkoutsListComponent implements OnInit {
  displayedColumns: string[] = ['date', 'setCount'];

  workouts: Workout[] = [];

  constructor(public dialog: MatDialog, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    for (let i = 0; i < 20; i++) {
      this.workouts.push({ id: i + 1, date: new Date(Date.UTC(2022, 1, i + 1)), setCount: 10 });
    }
  }

  openDialog(id: number) {
    let ref = this.dialog.open(EditWorkoutComponent, { width: '600px', data: id });
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.openSnackBar('Workout Saved!', 'Close');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, { duration: 3000, panelClass: 'snackbar' });
  }
}
