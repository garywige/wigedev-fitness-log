import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FreeModule } from './free/free.module';
import { ProModule } from './pro/pro.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, PageNotFoundComponent, SignInComponent, SignUpComponent],
  imports: [BrowserModule, AppRoutingModule, FreeModule, ProModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
