import { RouterModule, Routes } from '@angular/router';

import { CyclesComponent } from './cycles/cycles.component';
import { NgModule } from '@angular/core';
import { ExercisesComponent } from './exercises/exercises.component';

const routes: Routes = [
  { path: '', redirectTo: '/pro/cycles', pathMatch: 'full' },
  { path: 'cycles', component: CyclesComponent },
  { path: 'exercises', component: ExercisesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProRoutingModule {}
