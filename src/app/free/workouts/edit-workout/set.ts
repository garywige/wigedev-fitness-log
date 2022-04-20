export interface Set {
  exercise: {
    id: string
    name: string
  }
  weight: number
  unit: string
  reps: number
  completed: number | null
  order?: number
}
