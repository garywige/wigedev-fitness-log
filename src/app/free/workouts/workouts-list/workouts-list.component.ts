import { Component, OnInit } from '@angular/core';

import { EditWorkoutComponent } from '../edit-workout/edit-workout.component';
import { UiService } from 'src/app/common/services/ui/ui.service';

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

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    for (let i = 0; i < 20; i++) {
      this.workouts.push({ id: i + 1, date: new Date(Date.UTC(2022, 1, i + 1)), setCount: 10 });
    }
  }

  openDialog(id: number) {
    let ref = this.uiService.showDialog(EditWorkoutComponent, id);
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.uiService.toast('Workout Saved!')
      }
    });
  }
}
