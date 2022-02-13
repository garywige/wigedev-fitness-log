import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreeRoutingModule } from './free-routing.module';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutsCalendarComponent } from './workouts-calendar/workouts-calendar.component';
import { WorkoutsListComponent } from './workouts-list/workouts-list.component';

@NgModule({
  declarations: [WorkoutsComponent, WorkoutsCalendarComponent, WorkoutsListComponent],
  imports: [CommonModule, FreeRoutingModule],
})
export class FreeModule {}
