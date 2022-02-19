import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteCycleComponent } from './delete-cycle/delete-cycle.component';

@Component({
  selector: 'app-edit-cycle',
  templateUrl: './edit-cycle.component.html',
  styleUrls: ['./edit-cycle.component.css'],
})
export class EditCycleComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^(([a-zA-Z0-9]+)\s?)+$/)]),
  });

  constructor(private dialog: MatDialog, private snackbar: MatSnackBar) {}

  onSubmit() {
    let output = {
      name: this.form.get('name')?.value,
    };

    console.log(output);

    // inform user
    this.snackbar.open('Cycle Saved!', 'Close', { duration: 3000, panelClass: 'snackbar' });
  }

  openDeleteDialog() {
    let ref = this.dialog.open(DeleteCycleComponent, { width: '380px' });
    ref.afterClosed().subscribe((result) => {
      if (result) {
        // delete cycle

        // inform user
        this.snackbar.open('Cycle Deleted!', 'Close', { duration: 3000, panelClass: 'snackbar' });

        // close all dialogs
        this.dialog.closeAll();
      }
    });
  }
}
