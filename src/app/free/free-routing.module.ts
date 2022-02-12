import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { WorkoutsComponent } from './workouts/workouts.component';

const routes: Routes = [
  { path: '', redirectTo: '/free/workouts', pathMatch: 'full'},
  { path: 'workouts', component: WorkoutsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreeRoutingModule { }
