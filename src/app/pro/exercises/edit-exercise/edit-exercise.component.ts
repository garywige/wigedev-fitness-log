import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { DeleteExerciseComponent } from './delete-exercise/delete-exercise.component';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.css']
})
export class EditExerciseComponent {

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)])
  })

  constructor(private dialog: MatDialog) { }

  openDeleteDialog(){
    let ref = this.dialog.open(DeleteExerciseComponent, {width: '380px'})
    ref.afterClosed().subscribe(result => {
      if(result){
        // delete exercise
        console.log('deleting exercise')
      }
    })
  }

  onSubmit(){}
}
