import { ComponentType } from '@angular/cdk/portal'
import { Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private action: string = 'Close'
  private options = {
    duration: 3000,
    panelClass: 'snackbar',
  }

  constructor(private snackbar: MatSnackBar, private dialog: MatDialog) {}

  toast(message: string) {
    this.snackbar.open(message, this.action, this.options)
  }

  showDialog(component: ComponentType<unknown>, data: any = null, isSubDialog: boolean = false): MatDialogRef<unknown> {
    return this.dialog.open(component, { width: isSubDialog ? '380px' : '420px', data: data })
  }

  closeAllDialogs() {
    this.dialog.closeAll()
  }
}
