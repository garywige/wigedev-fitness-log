import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../auth/auth.service';
import { MaterialModule } from '../material/material.module';
import { AuthServiceFake } from './testing.fakes';

const modules = [
  RouterTestingModule,
  MaterialModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  CommonModule,
];

@NgModule({
  imports: modules,
  exports: modules,
  providers: [
    {provide: AuthService, useClass: AuthServiceFake}
  ]
})
export class TestingModule {}
