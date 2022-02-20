import { RouterModule, Routes } from '@angular/router';

import { CyclesComponent } from './cycles/cycles.component';
import { NgModule } from '@angular/core';
import { ExercisesComponent } from './exercises/exercises.component';
import { AuthGuardService } from '../common/services/auth/auth-guard.service';
import { Role } from '../common/services/auth/auth.enum';

const routes: Routes = [
  { path: '', redirectTo: '/pro/cycles', pathMatch: 'full' },
  { path: 'cycles', component: CyclesComponent, canActivate: [AuthGuardService], data: {expectedRole: Role.Pro} },
  { path: 'exercises', component: ExercisesComponent, canActivate: [AuthGuardService], data: {expectedRole: Role.Pro} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProRoutingModule {}
