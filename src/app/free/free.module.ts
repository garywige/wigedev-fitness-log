import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreeRoutingModule } from './free-routing.module';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutsCalendarComponent } from './workouts-calendar/workouts-calendar.component';


@NgModule({
  declarations: [
    WorkoutsComponent,
    WorkoutsCalendarComponent
  ],
  imports: [
    CommonModule,
    FreeRoutingModule
  ]
})
export class FreeModule { }
