import { CommonModule } from '@angular/common';
import { CyclesComponent } from './cycles/cycles.component';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { ProRoutingModule } from './pro-routing.module';
import { EditCycleComponent } from './cycles/edit-cycle/edit-cycle.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CyclesComponent, EditCycleComponent],
  imports: [CommonModule, ProRoutingModule, MaterialModule, ReactiveFormsModule],
})
export class ProModule {}
