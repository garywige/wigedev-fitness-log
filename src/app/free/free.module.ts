import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreeRoutingModule } from './free-routing.module';
import { WorkoutsComponent } from './workouts/workouts.component';


@NgModule({
  declarations: [
    WorkoutsComponent
  ],
  imports: [
    CommonModule,
    FreeRoutingModule
  ]
})
export class FreeModule { }
