import { MatDialog, MatDialogRef } from '@angular/material/dialog'

import { ComponentType } from '@angular/cdk/portal'
import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private action: string = 'Close'
  private options = {
    duration: 3000,
    panelClass: 'snackbar',
  }

  constructor(private snackbar: MatSnackBar, private dialog: MatDialog, private router: Router) {}

  toast(message: string) {
    this.snackbar.open(message, this.action, this.options)
  }

  showDialog(component: ComponentType<unknown>, data: any = null, isSubDialog: boolean = false): MatDialogRef<unknown> {
    return this.dialog.open(component, { width: isSubDialog ? '380px' : '420px', data: data, disableClose: true })
  }

  closeAllDialogs() {
    this.dialog.closeAll()
  }

  upgradeToast(){
    this.snackbar.open('Upgrade to WFL Pro?', 'Upgrade', {duration: 10000, panelClass: 'snackbar-upgrade'}).onAction().pipe(
      tap(() => {
        this.router.navigate(['/free/upgrade'])
      })
    ).subscribe()
  }
}
