import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { DeleteWorkoutComponent } from './delete-workout/delete-workout.component';
import { EditSetComponent } from './edit-set/edit-set.component';
import { EditWorkoutComponent } from './edit-workout/edit-workout.component';
import { FreeRoutingModule } from './free-routing.module';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { WorkoutsCalendarComponent } from './workouts-calendar/workouts-calendar.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutsListComponent } from './workouts-list/workouts-list.component';

@NgModule({
  declarations: [WorkoutsComponent, WorkoutsCalendarComponent, WorkoutsListComponent, EditWorkoutComponent, EditSetComponent, DeleteWorkoutComponent],
  imports: [CommonModule, FreeRoutingModule, MaterialModule, ReactiveFormsModule, FormsModule],
})
export class FreeModule {}
