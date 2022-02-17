import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { DeleteWorkoutComponent } from './workouts/edit-workout/delete-workout/delete-workout.component';
import { EditSetComponent } from './workouts/edit-workout/edit-set/edit-set.component';
import { EditWorkoutComponent } from './workouts/edit-workout/edit-workout.component';
import { FreeRoutingModule } from './free-routing.module';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { WorkoutsCalendarComponent } from './workouts/workouts-calendar/workouts-calendar.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutsListComponent } from './workouts/workouts-list/workouts-list.component';

@NgModule({
  declarations: [WorkoutsComponent, WorkoutsCalendarComponent, WorkoutsListComponent, EditWorkoutComponent, EditSetComponent, DeleteWorkoutComponent],
  imports: [CommonModule, FreeRoutingModule, MaterialModule, ReactiveFormsModule, FormsModule],
})
export class FreeModule {}
