import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-edit-cycle',
  templateUrl: './edit-cycle.component.html',
  styleUrls: ['./edit-cycle.component.css']
})
export class EditCycleComponent {

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^(([a-zA-Z0-9]+)\s?)+$/)])
  })

  constructor() { }

  onSubmit(){
    let output = {
      name: this.form.get('name')?.value
    }

    console.log(output)
  }

  openDeleteDialog(){

  }
}
