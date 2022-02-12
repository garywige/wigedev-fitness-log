import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProRoutingModule } from './pro-routing.module';
import { CyclesComponent } from './cycles/cycles.component';


@NgModule({
  declarations: [
    CyclesComponent
  ],
  imports: [
    CommonModule,
    ProRoutingModule
  ]
})
export class ProModule { }
