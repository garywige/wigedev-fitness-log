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

export interface deleteCycleOutput {
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
