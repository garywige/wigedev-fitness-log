import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UiService } from 'src/app/common/services/ui/ui.service';
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

  constructor(private uiService: UiService) {}

  onSubmit() {
    let output = {
      name: this.form.get('name')?.value,
    };

    console.log(output);

    // inform user
    this.uiService.toast('Cycle Saved!')
  }

  openDeleteDialog() {
    let ref = this.uiService.showDialog(DeleteCycleComponent, null, true);
    ref.afterClosed().subscribe((result) => {
      if (result) {
        // delete cycle

        // inform user
        this.uiService.toast('Cycle Deleted!')

        // close all dialogs
        this.uiService.closeAllDialogs()
      }
    });
  }
}
