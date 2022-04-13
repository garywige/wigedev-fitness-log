import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string, accountType: string): Observable<signupOutput> {
    const url = environment.apiurl + '/v1/signup'
    const reqBody = {
      email: email,
      password: password,
      accountType: accountType,
    }

    return this.http.post<signupOutput>(url, reqBody)
  }

  signin(email: string, password: string): Observable<signinOutput> {
    const url = environment.apiurl + '/v1/signin'
    const reqBody = {
      email: email,
      password: password,
    }

    return this.http.post<signinOutput>(url, reqBody)
  }

  verifyEmail(email: string, hash: string): Observable<VerifyEmailOutput> {
    const url = environment.apiurl + '/v1/verifyemail'
    const reqBody = {
      email: email,
      hash: hash,
    }

    return this.http.put<VerifyEmailOutput>(url, reqBody)
  }

  upgrade(body: {
    type: string
    card: string
    name: { first: string; last: string }
    address: {
      line1: string
      line2?: string
      city: string
      state: string
      zip: string
      country: string
    }
  }): Observable<UpgradeOutput> {
    const url = environment.apiurl + '/v1/upgrade'

    return this.http.post<UpgradeOutput>(url, body)
  }

  readCycles(): Observable<CyclesOutput> {
    const url = environment.apiurl + '/v1/cycles'
    return this.http.get<CyclesOutput>(url)
  }

  createCycle(name: string): Observable<CycleOutput> {
    const url = environment.apiurl + '/v1/cycles'
    const reqBody = {
      name: name,
    }

    return this.http.post<CycleOutput>(url, reqBody)
  }

  readCycle(id: string): Observable<CycleOutput> {
    const url = environment.apiurl + '/v1/cycle/' + id
    return this.http.get<CycleOutput>(url)
  }

  updateCycle(id: string, name: string): Observable<CycleOutput> {
    const url = environment.apiurl + '/v1/cycle/' + id
    const reqBody = {
      name: name,
    }

    return this.http.put<CycleOutput>(url, reqBody)
  }

  deleteCycle(id: string): Observable<DeleteOutput> {
    const url = environment.apiurl + '/v1/cycle/' + id
    return this.http.delete<DeleteOutput>(url)
  }

  readExercises(): Observable<ExercisesOutput> {
    const url = environment.apiurl + '/v1/exercises'
    return this.http.get<ExercisesOutput>(url)
  }

  createExercise(name: string): Observable<ExerciseOutput> {
    const url = environment.apiurl + '/v1/exercises'
    const reqBody = {
      name: name,
    }

    return this.http.post<ExerciseOutput>(url, reqBody)
  }

  readExercise(id: string): Observable<ExerciseOutput> {
    const url = environment.apiurl + '/v1/exercise/' + id
    return this.http.get<ExerciseOutput>(url)
  }

  updateExercise(id: string, name: string): Observable<ExerciseOutput> {
    const url = environment.apiurl + '/v1/exercise/' + id
    const reqBody = {
      name: name,
    }

    return this.http.put<ExerciseOutput>(url, reqBody)
  }

  deleteExercise(id: string): Observable<DeleteOutput> {
    const url = environment.apiurl + '/v1/exercise/' + id
    return this.http.delete<DeleteOutput>(url)
  }

  readWorkouts(cycle: string): Observable<WorkoutsOutput> {
    const url = environment.apiurl + '/v1/workouts?cycle=' + cycle
    return this.http.get<WorkoutsOutput>(url)
  }

  createWorkout(date: Date, cycleId: string, sets: WorkoutSet[]): Observable<WorkoutOutput> {
    const url = environment.apiurl + '/v1/workouts'
    const reqBody = {
      date: this.toDateString(date),
      cycleId: cycleId,
      sets: sets,
    }

    return this.http.post<WorkoutOutput>(url, reqBody)
  }

  readWorkout(date: Date, cycleId: string): Observable<WorkoutOutput> {
    const url = environment.apiurl + `/v1/workout/${this.toDateString(date)}?cycle=${cycleId}`
    return this.http.get<WorkoutOutput>(url)
  }

  updateWorkout(date: Date, cycleId: string, sets: WorkoutSet[]): Observable<WorkoutOutput> {
    const url = environment.apiurl + `/v1/workout/${this.toDateString(date)}?cycle=${cycleId}`
    const reqBody = {
      sets: sets,
    }

    return this.http.put<WorkoutOutput>(url, reqBody)
  }

  deleteWorkout(date: Date, cycleId: string): Observable<DeleteOutput> {
    const url = environment.apiurl + `/v1/workout/${this.toDateString(date)}?cycle=${cycleId}`
    return this.http.delete<DeleteOutput>(url)
  }

  private toDateString(date: Date): string {
    return date?.toISOString()?.split('T')[0]
  }
}

export interface signupOutput {
  email: string
  message: string
}

export interface signinOutput {
  accessToken: string
  message: string
}

export interface VerifyEmailOutput {
  email: string
  verified: boolean
  message: string
}

export interface UpgradeOutput {
  email: string
  paidThrough: Date
}

export interface CyclesElement {
  id: string
  name: string
  modified: Date
  workoutCount: number
}

export interface CyclesOutput {
  cycles: CyclesElement[]
  message: string
}

export interface CycleOutput extends CyclesElement {
  message: string
}

export interface DeleteOutput {
  message: string
}

export interface ExercisesElement {
  id: string
  name: string
  workoutCount: number
}

export interface ExercisesOutput {
  exercises: ExercisesElement[]
  message: string
}

export interface ExerciseOutput {
  id: string
  name: string
  message: string
}

export interface WorkoutsElement {
  date: Date
  setCount: number
}

export interface WorkoutsOutput {
  workouts: WorkoutsElement[]
  message: string
}

export interface WorkoutSet {
  exerciseId: string
  weight: number
  unit: string
  repsPrescribed: number
  repsPerformed: number | null
}

export interface WorkoutElement {
  id: string
  exercise: {
    id: string
    name: string
  }
  weight: number
  unit: string
  repsPrescribed: number
  repsPerformed: number
}

export interface WorkoutOutput {
  date: Date
  cycleId: string
  setCount: number
  sets: WorkoutElement[]
  message: string
}
