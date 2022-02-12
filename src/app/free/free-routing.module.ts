import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { WorkoutsCalendarComponent } from './workouts-calendar/workouts-calendar.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutsListComponent } from './workouts-list/workouts-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/free/workouts/calendar', pathMatch: 'full'},
  { path: 'workouts', component: WorkoutsComponent, children: [
    { path: 'calendar', component: WorkoutsCalendarComponent},
    { path: 'list', component: WorkoutsListComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreeRoutingModule { }
