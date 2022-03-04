import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ValidateInt, ValidateWeight } from 'src/app/common/validators/validators'

import { Component, OnInit } from '@angular/core'
import { Set } from '../set'
import { ApiService } from 'src/app/common/services/api/api.service'
import { filter, tap } from 'rxjs'

@Component({
  selector: 'app-edit-set',
  templateUrl: './edit-set.component.html',
  styleUrls: ['./edit-set.component.css'],
})
export class EditSetComponent implements OnInit {
  form = new FormGroup({
    exercise: new FormControl('', Validators.required),
    weight: new FormControl('', [ValidateWeight(), Validators.required]),
    unit: new FormControl('', Validators.required),
    reps: new FormControl('', [ValidateInt(), Validators.required]),
  })

  output: Set = <Set>{}
  exercises: Exercise[] = []

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadExercises()
  }

  loadExercises() {
    this.api
      .readExercises()
      .pipe(
        filter((output) => (output?.message ? false : true)),
        tap((output) => {
          this.exercises = output?.exercises
        })
      )
      .subscribe()
  }

  onSubmit() {
    this.output.exercise = {
      id: this.form.get('exercise')?.value,
      name: this.getExerciseName(this.form.get('exercise')?.value),
    }
    this.output.weight = +this.form.get('weight')?.value
    this.output.unit = this.form.get('unit')?.value
    this.output.reps = +this.form.get('reps')?.value
  }

  getExerciseName(id: string): string {
    let name = ''
    this.exercises.forEach((exercise) => {
      if (exercise?.id === id) {
        name = exercise?.name
      }
    })

    return name
  }
}

interface Exercise {
  id: string
  name: string
}
