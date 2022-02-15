import { CommonModule } from '@angular/common';
import { FreeRoutingModule } from './free-routing.module';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { WorkoutsCalendarComponent } from './workouts-calendar/workouts-calendar.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutsListComponent } from './workouts-list/workouts-list.component';
import { EditWorkoutComponent } from './edit-workout/edit-workout.component';
import { EditSetComponent } from './edit-set/edit-set.component';

@NgModule({
  declarations: [WorkoutsComponent, WorkoutsCalendarComponent, WorkoutsListComponent, EditWorkoutComponent, EditSetComponent],
  imports: [CommonModule, FreeRoutingModule, MaterialModule],
})
export class FreeModule {}
