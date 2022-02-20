import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private action: string = 'Close'
  private options = {
    duration: 3000,
    panelClass: 'snackbar'
  }

  constructor(private snackbar: MatSnackBar) { }

  toast(message: string){
    this.snackbar.open(message, this.action, this.options)
  }
}
