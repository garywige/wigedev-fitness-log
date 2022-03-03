import { Component, OnInit } from '@angular/core'
import { map, tap } from 'rxjs'
import { ApiService, readCyclesElement } from 'src/app/common/services/api/api.service'
import { UiService } from 'src/app/common/services/ui/ui.service'
import { WorkoutService } from 'src/app/common/services/workout/workout.service'

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css'],
})
export class WorkoutsComponent implements OnInit {
  cycles: readCyclesElement[] = []
  selectedCycle: readCyclesElement = {
    id: '',
    name: '',
    modified: new Date('1970-01-01'),
    workoutCount: 0
  }

  constructor(private api: ApiService, private uiService: UiService, private workoutService: WorkoutService) {}

  ngOnInit() {
    // populate cycles
    this.api.readCycles().pipe(map(result => {
      if(result?.message){
        this.uiService.toast('There was an error reading cycles.')
        return []
      }
      else{
        return result?.cycles
      }
    }), tap(cycles => {
      this.cycles = cycles
    }),tap(() => {
      // determine the latest cycle
      this.cycles?.forEach(cycle => {
        if(!this.selectedCycle.id || cycle?.modified > this.selectedCycle?.modified){
          this.selectedCycle = cycle
        }
      })
    })).subscribe()
  }

  onSelectionChange(){
    this.workoutService.selectedCycleId$.next(this.selectedCycle?.id)
  }
}


