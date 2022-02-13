import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout'
import { FreeModule } from './free/free.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProModule } from './pro/pro.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, PageNotFoundComponent, SignInComponent, SignUpComponent],
  imports: [BrowserModule, AppRoutingModule, FreeModule, ProModule, BrowserAnimationsModule,
    MaterialModule, FlexLayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
