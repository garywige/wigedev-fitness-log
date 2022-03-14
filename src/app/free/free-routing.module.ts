import { RouterModule, Routes } from '@angular/router'

import { AuthGuardService } from '../common/services/auth/auth-guard.service'
import { NgModule } from '@angular/core'
import { Role } from '../common/services/auth/auth.enum'
import { WorkoutsComponent } from './workouts/workouts.component'

const routes: Routes = [
  { path: '', redirectTo: '/free/workouts', pathMatch: 'full' },
  {
    path: 'workouts',
    component: WorkoutsComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: Role.Free}
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreeRoutingModule {}
