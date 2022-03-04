import { Component, Inject, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { filter, map, tap } from 'rxjs'
import { ApiService } from 'src/app/common/services/api/api.service'
import { UiService } from 'src/app/common/services/ui/ui.service'
import { DeleteCycleComponent } from './delete-cycle/delete-cycle.component'

@Component({
  selector: 'app-edit-cycle',
  templateUrl: './edit-cycle.component.html',
  styleUrls: ['./edit-cycle.component.css'],
})
export class EditCycleComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^(([a-zA-Z0-9]+)\s?)+$/)]),
  })

  output: {id: string | null, name: string} = {id: null, name: ''}

  constructor(private uiService: UiService, @Inject(MAT_DIALOG_DATA) data: any, private api: ApiService) {
    if(data?.id){
      this.output.id = data.id
    }
  }

  ngOnInit() {
    if(this.output.id){
      this.api.readCycle(this.output.id).pipe(
        map(output => {
          if(output?.message){
            this.uiService.toast("There was an error loading the cycle.")
            return null
          }

          return output
        }),
        filter(data => data !== null),
        tap(cycle => {
          this.form.get('name')?.setValue(cycle?.name)
        })
      ).subscribe()
    }
  }

  onSubmit() {
    this.output.name = this.form.get('name')?.value

    // inform user
    this.uiService.toast('Cycle Saved!')
  }

  openDeleteDialog() {
    let ref = this.uiService.showDialog(DeleteCycleComponent, null, true)
    ref.afterClosed().pipe(
      filter(result => result),
      tap(() => {
        // delete cycle
        this.api.deleteCycle(this.output.id as string).pipe(
          tap(() => {

            // inform user
            this.uiService.toast('Cycle Deleted!')

            // close all dialogs
            this.uiService.closeAllDialogs()
          })
        ).subscribe()

      })
    ).subscribe()
  }
}
