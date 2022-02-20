import { Set } from './set'

export class ExerciseGroup {
  name: string = ''
  sets: Set[] = []

  constructor(exercise: string, sets: Set[]) {
    this.name = exercise
    this.sets = sets
  }
}
