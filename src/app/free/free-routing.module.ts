import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { WorkoutsCalendarComponent } from './workouts/workouts-calendar/workouts-calendar.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutsListComponent } from './workouts/workouts-list/workouts-list.component';
import { AuthGuardService } from '../common/services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/free/workouts/calendar', pathMatch: 'full' },
  {
    path: 'workouts',
    component: WorkoutsComponent,
    children: [
      { path: 'calendar', component: WorkoutsCalendarComponent, canActivate: [AuthGuardService] },
      { path: 'list', component: WorkoutsListComponent, canActivate: [AuthGuardService] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreeRoutingModule {}
