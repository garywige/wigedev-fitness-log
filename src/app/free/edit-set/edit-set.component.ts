import { FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms'

import { Component } from '@angular/core'
interface set {
  exercise: string,
  weight: number,
  unit: string,
  reps: number
}

@Component({
  selector: 'app-edit-set',
  templateUrl: './edit-set.component.html',
  styleUrls: ['./edit-set.component.css']
})
export class EditSetComponent {
  form = new FormGroup({
    exercise: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    reps: new FormControl('', Validators.required)
  })

  output: set = <set>{}
  constructor() { }

  onSubmit(){
    this.output.exercise = this.form.get('exercise')?.value
    this.output.weight = +this.form.get('weight')?.value
    this.output.unit = this.form.get('unit')?.value
    this.output.reps = +this.form.get('reps')?.value
  }

}
