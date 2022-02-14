import { CommonModule } from '@angular/common';
import { CyclesComponent } from './cycles/cycles.component';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { ProRoutingModule } from './pro-routing.module';

@NgModule({
  declarations: [CyclesComponent],
  imports: [CommonModule, ProRoutingModule, MaterialModule],
})
export class ProModule {}
