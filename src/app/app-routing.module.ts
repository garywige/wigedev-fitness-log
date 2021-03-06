import { RouterModule, Routes } from '@angular/router'

import { AuthGuardService } from './common/services/auth/auth-guard.service'
import { EmailVerificationComponent } from './email-verification/email-verification.component'
import { HomeComponent } from './home/home.component'
import { NgModule } from '@angular/core'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { SignInComponent } from './sign-in/sign-in.component'
import { SignUpComponent } from './sign-up/sign-up.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'verify/:email', component: EmailVerificationComponent },
  {
    path: 'free',
    loadChildren: () => import('./free/free.module').then((result) => result.FreeModule),
    canLoad: [AuthGuardService],
  },
  {
    path: 'pro',
    loadChildren: () => import('./pro/pro.module').then((result) => result.ProModule),
    canLoad: [AuthGuardService],
  },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
