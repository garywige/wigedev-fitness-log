import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UiService } from 'src/app/common/services/ui/ui.service'
import { DeleteExerciseComponent } from './delete-exercise/delete-exercise.component'

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.css'],
})
export class EditExerciseComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]),
  })

  constructor(private uiService: UiService) {}

  openDeleteDialog() {
    let ref = this.uiService.showDialog(DeleteExerciseComponent, null, true)
    ref.afterClosed().subscribe((result) => {
      if (result) {
        // delete exercise
        this.uiService.toast('Exercise Deleted!')
        this.uiService.closeAllDialogs()
      }
    })
  }

  onSubmit() {
    let output = {
      name: this.form.get('name')?.value,
    }

    console.log(output)

    // give user feedback
    this.uiService.toast('Exercise Saved!')
  }
}
