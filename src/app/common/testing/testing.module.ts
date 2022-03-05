import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { AuthService } from '../services/auth/auth.service'
import { MaterialModule } from '../../material/material.module'
import { AuthServiceFake } from './testing.fakes'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { HttpClientTestingModule } from '@angular/common/http/testing'

const modules = [
  RouterTestingModule,
  MaterialModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  CommonModule,
  HttpClientTestingModule,
]

@NgModule({
  imports: modules,
  exports: modules,
  providers: [
    { provide: AuthService, useClass: AuthServiceFake },
    { provide: MAT_DIALOG_DATA, useValue: { id: '62225f6e848445b5c4ad085b' } },
  ],
})
export class TestingModule {}
