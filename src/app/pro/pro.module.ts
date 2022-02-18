import { CommonModule } from '@angular/common';
import { CyclesComponent } from './cycles/cycles.component';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { ProRoutingModule } from './pro-routing.module';
import { EditCycleComponent } from './cycles/edit-cycle/edit-cycle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteCycleComponent } from './cycles/edit-cycle/delete-cycle/delete-cycle.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { EditExerciseComponent } from './exercises/edit-exercise/edit-exercise.component';
import { DeleteExerciseComponent } from './exercises/edit-exercise/delete-exercise/delete-exercise.component';

@NgModule({
  declarations: [CyclesComponent, EditCycleComponent, DeleteCycleComponent, ExercisesComponent, EditExerciseComponent, DeleteExerciseComponent],
  imports: [CommonModule, ProRoutingModule, MaterialModule, ReactiveFormsModule],
})
export class ProModule {}
