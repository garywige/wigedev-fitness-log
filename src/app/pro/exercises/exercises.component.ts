import { Component, OnInit } from '@angular/core'
import { UiService } from 'src/app/common/services/ui/ui.service'
import { EditExerciseComponent } from './edit-exercise/edit-exercise.component'

interface Exercise {
  id: number
  name: string
  workoutCount: number
}

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
})
export class ExercisesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'workoutCount']

  exercises: Exercise[] = []

  constructor(private uiService: UiService) {}

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.exercises = [
      { id: 1, name: 'Bench Press', workoutCount: 10 },
      { id: 2, name: 'Squat', workoutCount: 20 },
      { id: 3, name: 'Deadlift', workoutCount: 10 },
    ]
  }

  openExerciseDialog(id: number) {
    this.uiService.showDialog(EditExerciseComponent, id)
  }
}
