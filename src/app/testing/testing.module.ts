import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../material/material.module';

const modules = [
  RouterTestingModule,
  MaterialModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class TestingModule { }
