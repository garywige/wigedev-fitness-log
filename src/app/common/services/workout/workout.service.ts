import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  selectedCycleId$: BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor() {}
}
