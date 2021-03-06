import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FreeModule } from './free/free.module'
import { HomeComponent } from './home/home.component'
import { MaterialModule } from './material/material.module'
import { NgModule } from '@angular/core'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { ProModule } from './pro/pro.module'
import { ReactiveFormsModule } from '@angular/forms'
import { SignInComponent } from './sign-in/sign-in.component'
import { SignUpComponent } from './sign-up/sign-up.component'
import { SignUpVerificationComponent } from './sign-up/sign-up-verification/sign-up-verification.component'
import { AuthService } from './common/services/auth/auth.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthHttpInterceptor } from './common/services/auth/auth-http-interceptor'
import { ApiAuthService } from './common/services/auth/auth.api.service'
import { EmailVerificationComponent } from './email-verification/email-verification.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    SignInComponent,
    SignUpComponent,
    SignUpVerificationComponent,
    EmailVerificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FreeModule,
    ProModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: AuthService, useClass: ApiAuthService },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
