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

  getCycles(): Observable<getCyclesOutput>{
    const url = environment.apiurl + '/v1/cycles'
    return this.http.get<getCyclesOutput>(url)
  }

  createCycle(name: string): Observable<createCycleOutput>{
    const url = environment.apiurl + '/v1/cycles'
    const reqBody = {
      name: name
    }

    return this.http.post<createCycleOutput>(url, reqBody)
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

export interface getCyclesElement {
  id: string,
  name: string,
  modified: Date,
  workoutCount: number
}

export interface getCyclesOutput {
  cycles: getCyclesElement[],
  message: string
}

export interface createCycleOutput extends getCyclesElement {
  message: string
}
