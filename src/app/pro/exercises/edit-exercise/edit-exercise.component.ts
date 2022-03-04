import { Component, Inject, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { filter, map, tap } from 'rxjs'
import { ApiService } from 'src/app/common/services/api/api.service'
import { UiService } from 'src/app/common/services/ui/ui.service'
import { DeleteExerciseComponent } from './delete-exercise/delete-exercise.component'

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.css'],
})
export class EditExerciseComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]),
  })
  id: string | null = null

  constructor(private uiService: UiService, @Inject(MAT_DIALOG_DATA) data: any, private api: ApiService) {
    if(data?.id){
      this.id = data.id
    }
  }

  ngOnInit(){
    if(this.id){
      this.api.readExercise(this.id).pipe(
        map(output => {
          if(output?.message){
            this.uiService.toast('An error occurred retrieving the exercise.')
            return null
          }

          return output
        }),
        filter(data => data !== null),
        tap(exercise => {
          this.form.get('name')?.setValue(exercise?.name)
        })
      ).subscribe()
    }
  }

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
      id: this.id,
      name: this.form.get('name')?.value,
    }

    console.log(output)

    // give user feedback
    this.uiService.toast('Exercise Saved!')
  }
}
