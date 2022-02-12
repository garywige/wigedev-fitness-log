import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FreeModule } from './free/free.module';
import { ProModule } from './pro/pro.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, FreeModule, ProModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
