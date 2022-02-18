import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { MatNativeDateModule } from '@angular/material/core'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTableModule } from '@angular/material/table'
import { NgModule } from '@angular/core';

const modules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatMenuModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDividerModule,
  MatSnackBarModule,
  MatTableModule
]


@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class MaterialModule { }
