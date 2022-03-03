import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string, accountType: string): Observable<signupOutput>{
    const url = environment.apiurl + '/v1/signup'
    const reqBody = {
      email: email,
      password: password,
      accountType: accountType
    }

    return this.http.post<signupOutput>(url, reqBody)
  }

  signin(email: string, password: string): Observable<signinOutput> {
    const url = environment.apiurl + '/v1/signin'
    const reqBody = {
      email: email,
      password: password
    }

    return this.http.post<signinOutput>(url, reqBody)
  }

  readCycles(): Observable<readCyclesOutput>{
    const url = environment.apiurl + '/v1/cycles'
    return this.http.get<readCyclesOutput>(url)
  }

  createCycle(name: string): Observable<createCycleOutput>{
    const url = environment.apiurl + '/v1/cycles'
    const reqBody = {
      name: name
    }

    return this.http.post<createCycleOutput>(url, reqBody)
  }

  readCycle(id: string): Observable<readCycleOutput>{
    const url = environment.apiurl + '/v1/cycle/' + id
    return this.http.get<readCycleOutput>(url)
  }

  updateCycle(id: string, name: string): Observable<updateCycleOutput> {
    const url = environment.apiurl + '/v1/cycle/' + id
    const reqBody = {
      name: name
    }

    return this.http.put<updateCycleOutput>(url, reqBody)
  }

  deleteCycle(id: string): Observable<deleteCycleOutput>{
    const url = environment.apiurl + '/v1/cycle/' + id
    return this.http.delete<deleteCycleOutput>(url)
  }

  readExercises(): Observable<readExercisesOutput> {
    const url = environment.apiurl + '/v1/exercises'
    return this.http.get<readExercisesOutput>(url)
  }

  createExercise(name: string): Observable<createExerciseOutput>{
    const url = environment.apiurl + '/v1/exercises'
    const reqBody = {
      name: name
    }

    return this.http.post<createExerciseOutput>(url, reqBody)
  }

  readExercise(id: string): Observable<readExerciseOutput>{
    const url = environment.apiurl + '/v1/exercise/' + id
    return this.http.get<readExerciseOutput>(url)
  }

  updateExercise(id: string, name: string): Observable<updateExerciseOutput>{
    const url = environment.apiurl + '/v1/exercise/' + id
    const reqBody = {
      name: name
    }

    return this.http.put<updateExerciseOutput>(url, reqBody)
  }

  deleteExercise(id: string): Observable<deleteExerciseOutput>{
    const url = environment.apiurl + '/v1/exercise/' + id
    return this.http.delete<deleteExerciseOutput>(url)
  }

  readWorkouts(cycle: string): Observable<readWorkoutsOutput>{
    const url = environment.apiurl + '/v1/workouts?cycle=' + cycle
    return this.http.get<readWorkoutsOutput>(url)
  }

  createWorkout(date: Date, cycleId: string, sets: createWorkoutSet[]): Observable<createWorkoutOutput>{
    const url = environment.apiurl + '/v1/workouts'
    const reqBody = {
      date: this.toDateString(date),
      cycleId: cycleId,
      sets: sets
    }

    return this.http.post<createWorkoutOutput>(url, reqBody)
  }

  readWorkout(date: Date, cycleId: string): Observable<readWorkoutOutput>{
    const url = environment.apiurl + `/v1/workout/${this.toDateString(date)}?cycle=${cycleId}`
    return this.http.get<readWorkoutOutput>(url)
  }

  updateWorkout(date: Date, cycleId: string, sets: updateWorkoutSet[]): Observable<updateWorkoutOutput>{
    const url = environment.apiurl + `/v1/workout/${this.toDateString(date)}?cycle=${cycleId}`
    const reqBody = {
      sets: sets
    }

    return this.http.put<updateWorkoutOutput>(url, reqBody)
  }

  deleteWorkout(date: Date, cycleId: string): Observable<deleteWorkoutOutput>{
    const url = environment.apiurl + `/v1/workout/${this.toDateString(date)}?cycle=${cycleId}`
    return this.http.delete<deleteWorkoutOutput>(url)
  }

  private toDateString(date: Date): string {
    return date?.toISOString()?.split('T')[0]
  }
}

export interface signupOutput {
  email: string,
  message: string
}

export interface signinOutput {
  accessToken: string,
  message: string
}

export interface readCyclesElement {
  id: string,
  name: string,
  modified: Date,
  workoutCount: number
}

export interface readCyclesOutput {
  cycles: readCyclesElement[],
  message: string
}

export interface createCycleOutput extends readCyclesElement {
  message: string
}

export interface readCycleOutput extends createCycleOutput {
}

export interface updateCycleOutput extends createCycleOutput {
}

export interface deleteOutput {
  message: string
}

export interface deleteCycleOutput extends deleteOutput {
  message: string
}

export interface readExercisesElement {
  id: string,
  name: string,
  workoutCount: number
}

export interface readExercisesOutput {
  exercises: readExercisesElement[],
  message: string
}

export interface createExerciseOutput{
  id: string,
  name: string,
  message: string
}

export interface readExerciseOutput extends createExerciseOutput {
}

export interface updateExerciseOutput extends createExerciseOutput {
}

export interface deleteExerciseOutput extends deleteOutput{
}

export interface readWorkoutsElement {
  date: Date,
  setCount: number
}

export interface readWorkoutsOutput {
  workouts: readWorkoutsElement[],
  message: string
}

export interface createWorkoutSet {
  exerciseId: string,
  weight: number,
  unit: string,
  repsPrescribed: number,
  repsPerformed: number
}

export interface createWorkoutElement {
  id: string,
  exercise: {
    id: string,
    name: string
  },
  weight: number,
  unit: string,
  repsPrescribed: number,
  repsPerformed: number
}

export interface createWorkoutOutput {
  date: Date,
  cycleId: string,
  sets: createWorkoutElement[],
  message: string
}

export interface readWorkoutOutput extends createWorkoutOutput{

}

export interface updateWorkoutSet extends createWorkoutSet {

}

export interface updateWorkoutOutput extends createWorkoutOutput {

}

export interface deleteWorkoutOutput extends deleteOutput{

}
