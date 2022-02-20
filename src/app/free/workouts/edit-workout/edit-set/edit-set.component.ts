import { FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { ValidateInt, ValidateWeight } from 'src/app/common/validators/validators';

import { Component, OnInit } from '@angular/core';
import { Set } from '../set';

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
  });

  output: Set = <Set>{};
  exercises: string[] = [];

  constructor() {}

  ngOnInit() {
    this.loadExercises();
  }

  loadExercises() {
    this.exercises = ['Bench Press', 'Squat', 'Deadlift', 'Overhead Press'];
  }

  onSubmit() {
    this.output.exercise = this.form.get('exercise')?.value;
    this.output.weight = +this.form.get('weight')?.value;
    this.output.unit = this.form.get('unit')?.value;
    this.output.reps = +this.form.get('reps')?.value;
  }
}
